-- Landcaster Area Score V2 calibration.
-- The current Paavo 12f5/2024 release returns zero workplace counts for all
-- imported postal areas in the 2026 postal-area classification. A zero-variance
-- input cannot rank areas, so the workplace pillar is kept visible at a neutral
-- 50/100 but excluded from the V2 composite until the source becomes informative.
-- Percentile components use the midpoint of percent_rank and cume_dist so tied
-- values are not pushed artificially to the top of the distribution.

with raw as (
  select
    postal_code,
    statistical_year,
    median_income_eur,
    employment_rate_pct,
    young_adult_share_pct,
    working_age_share_pct,
    workplace_per_100_residents,
    case when median_income_eur is null then 0.5 else
      (percent_rank() over (partition by statistical_year order by median_income_eur)
       + cume_dist() over (partition by statistical_year order by median_income_eur)) / 2 end as income_pct,
    case when employment_rate_pct is null then 0.5 else
      (percent_rank() over (partition by statistical_year order by employment_rate_pct)
       + cume_dist() over (partition by statistical_year order by employment_rate_pct)) / 2 end as employment_pct,
    case when young_adult_share_pct is null then 0.5 else
      (percent_rank() over (partition by statistical_year order by young_adult_share_pct)
       + cume_dist() over (partition by statistical_year order by young_adult_share_pct)) / 2 end as young_pct,
    case when working_age_share_pct is null then 0.5 else
      (percent_rank() over (partition by statistical_year order by working_age_share_pct)
       + cume_dist() over (partition by statistical_year order by working_age_share_pct)) / 2 end as working_age_pct
  from public.landcaster_paavo_fundamentals_v1
), calibrated as (
  select
    postal_code,
    statistical_year,
    round((income_pct * 100)::numeric, 2) as income_score,
    round((employment_pct * 100)::numeric, 2) as employment_score,
    round(((young_pct * 0.65 + working_age_pct * 0.35) * 100)::numeric, 2) as demographic_score,
    50::numeric as workplace_score
  from raw
), scored as (
  select
    postal_code,
    statistical_year,
    income_score,
    employment_score,
    demographic_score,
    workplace_score,
    round((employment_score * 0.40 + income_score * 0.35 + demographic_score * 0.25)::numeric, 2) as fundamentals_score
  from calibrated
)
update public.landcaster_area_score_v2_snapshots s
set
  income_score = c.income_score,
  employment_score = c.employment_score,
  demographic_score = c.demographic_score,
  workplace_score = c.workplace_score,
  fundamentals_score = c.fundamentals_score,
  area_score_v2 = round((s.market_score * 0.50 + c.fundamentals_score * 0.50)::numeric, 2),
  model_version = 'area_score_v2_paavo_2026_02',
  evidence = coalesce(s.evidence, '{}'::jsonb) || jsonb_build_object(
    'methodology', '50% Area Score V1 market signal + 50% Paavo fundamentals. Fundamentals: 40% labour-force employment, 35% median income, 25% demographic demand. Nationwide tied-percentile midpoint ranks.',
    'workplace_signal_status', 'inactive_zero_variance_12f5_2024',
    'workplace_signal_note', 'Paavo 12f5/2024 currently returns zero workplace counts across the imported 2026-classification postal areas, so it is shown as neutral 50/100 and excluded from the composite.',
    'calibration', 'v2_paavo_2026_02'
  )
from scored c
where c.postal_code = s.postal_code
  and c.statistical_year = s.fundamentals_year
  and s.model_version = 'area_score_v2_paavo_2026_01';
