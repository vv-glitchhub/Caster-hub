# Carcaster MVP

Carcaster is the Caster app for car diagnostics, ownership costs and maintenance planning.

## Goal

Make car problems easier to understand and track. The app should help the user explain symptoms, save fault codes, plan maintenance and communicate clearly with a repair shop.

## MVP features

- Car profile
- Fault code log
- Symptom log
- Maintenance timeline
- Repair cost tracker
- Fuel and CNG cost calculator
- Repair shop message generator
- Reminder plan for inspection, oil, tires and insurance

## First real case

Volkswagen Passat Variant 2012 1.4 TSI bensiini/kaasu automatic.

Known context:

- Fault code P2177
- Lean off idle bank 1
- Rough idle / hesitation / low-RPM jerking
- Parking sensor problems
- Reverse camera issue
- Lane assist issue
- CNG cost tracking

## Engine file

`lib/carcaster-engine.ts`

Includes:

- `createCarProfile`
- `explainFault`
- `calculateOwnershipCosts`
- `getMaintenanceStatus`

## Pages to build next

- `/apps/carcaster/profile`
- `/apps/carcaster/faults`
- `/apps/carcaster/maintenance`
- `/apps/carcaster/costs`

## Database plan

Tables later:

- `car_profiles`
- `car_faults`
- `car_symptoms`
- `maintenance_events`
- `fuel_logs`
- `repair_shop_messages`
- `car_reminders`

## AI agent behavior

The agent should:

- Explain possible causes without pretending certainty.
- Separate engine faults from parking/camera/electrical issues.
- Say what to check first.
- Mark urgent vs non-urgent.
- Generate repair shop messages.
- Track recurring issues over time.

## Safety

Carcaster must not replace a mechanic. Urgent safety issues, brake problems, steering problems, overheating or strong fuel smell should be escalated to a professional immediately.
