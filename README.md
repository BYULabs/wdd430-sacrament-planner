# Sacrament Meeting Planner

A full-stack Next.js application for planning, browsing, and printing Sunday sacrament meeting programs for the fictional Oakridge Ward. Built for **WDD 430: Web Full-Stack Development** at BYU-Idaho.

Bishopric members can capture a complete program — presiding and conducting leaders, announcements, hymns, prayers, ward and stake business, speakers, and musical numbers — and members can browse or print the resulting agenda.

## Tech Stack

| Layer      | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, Server Components) |
| Language   | TypeScript (strict)                                  |
| Database   | Postgres on Neon, via `@neondatabase/serverless`     |
| Styling    | Tailwind CSS v4 with custom navy theme tokens        |
| Validation | Zod schemas in Server Actions                        |
| Icons      | `lucide-react`                                       |
| Fonts      | Inter, loaded through `next/font/google`             |
| Tooling    | ESLint (`eslint-config-next`), Prettier              |

## Features

- **Home page** — hero banner, the three nearest upcoming meetings, and an inline detail view of the current program.
- **Meetings directory** — paginated grid (6 per page) with debounced search across presiding, conducting, meeting type, and speaker names.
- **Meeting detail** — full program layout with print-optimized styles so an agenda fits a single page.
- **Current meeting shortcut** — `/meetings/current` resolves to today's meeting or the next upcoming one.
- **Create and edit meetings** — one shared `MeetingForm` backed by Server Actions and `useActionState`. Input is validated with Zod on the server; field errors are shown inline and the user's input is kept after a failed submit.
- **Delete meetings** — a Delete button on each meeting card asks for confirmation, then calls a Server Action.
- **Error handling** — `error.tsx` boundaries for the meetings routes, a dedicated not-found page for editing a meeting that doesn't exist, and database errors reported back to the form.
- **REST API** — JSON endpoints for meetings, suitable for external consumers.
- **Accessibility** — skip link, visible focus rings, `aria-current` navigation, and `prefers-reduced-motion` support.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A Postgres database (this project uses [Neon](https://neon.tech))

### Setup

```bash
git clone https://github.com/itusebastian/wdd430-sacrament-planner.git
cd wdd430-sacrament-planner
npm install
```

Create a `.env.local` file in the project root:

```bash
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

`DATABASE_URL` is the only variable the application reads. A Neon connection string works as-is.

### Database schema

Create the `meetings` table before starting the app:

```sql
CREATE TABLE meetings (
  id             SERIAL PRIMARY KEY,
  date           DATE    NOT NULL,
  meeting_type   TEXT    NOT NULL, -- 'testimony' | 'regular' | 'stake' | 'general'
  presiding      TEXT    NOT NULL,
  conducting     TEXT    NOT NULL,
  announcements  TEXT[]  DEFAULT '{}',
  opening_hymn   JSONB   NOT NULL, -- { "number": 19, "title": "We Thank Thee, O God, for a Prophet" }
  opening_prayer TEXT    NOT NULL,
  ward_business  JSONB   NOT NULL DEFAULT '[]', -- [{ "description": "..." }]
  stake_business BOOLEAN NOT NULL DEFAULT FALSE,
  sacrament_hymn JSONB   NOT NULL,
  speakers       JSONB   NOT NULL DEFAULT '[]', -- [{ "name": "...", "topic": "...", "type": "speaker" | "musical-number" }]
  closing_hymn   JSONB   NOT NULL,
  closing_prayer TEXT    NOT NULL
);
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the development server     |
| `npm run build`        | Create a production build        |
| `npm start`            | Serve the production build       |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format the project with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project Structure

```
app/
  (public)/            Member-facing routes
    about/             Project overview page
    meetings/          Directory, detail, current-meeting redirect, loading and error states
  (admin)/             Bishopric routes
    meetings/new/      Create-a-meeting form
    meetings/[id]/edit Edit form, with its own not-found page
    meetings/error.tsx Error boundary shared with the public meetings routes
  api/meetings/        REST endpoints
  layout.tsx           Root layout: header, footer, skip link, fonts
  globals.css          Tailwind theme tokens and print styles
components/            Header, Footer, NavLinks, MeetingCard, MeetingDetail,
                       MeetingSearch, Pagination, MeetingForm, DeleteMeetingButton
lib/
  types.ts             SacramentMeeting, Hymn, SpeakerItem, WardBusinessItem, MeetingFormValues
  meetings-db.ts       SQL queries against Neon (read, create, update, delete)
  actions.ts           Server Actions: createMeeting, updateMeeting, deleteMeeting
```

Route groups `(public)` and `(admin)` separate member-facing pages from bishopric tools without affecting URLs.

## Routes

| Path                  | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `/`                   | Home page with upcoming meetings and current program |
| `/meetings`           | Searchable, paginated directory                      |
| `/meetings/current`   | Redirects to today's or the next upcoming meeting    |
| `/meetings/[id]`      | Full program detail, print-optimized                 |
| `/meetings/new`       | Create a new meeting program                         |
| `/meetings/[id]/edit` | Edit an existing meeting                             |
| `/about`              | Project background and technical summary             |

## API

### `GET /api/meetings`

Returns a page of meetings as JSON.

| Query param | Default | Description                                           |
| ----------- | ------- | ----------------------------------------------------- |
| `query`     | `''`    | Matches presiding, conducting, meeting type, speakers |
| `page`      | `1`     | 1-based page number, 6 meetings per page              |

```bash
curl 'http://localhost:3000/api/meetings?query=testimony&page=1'
```

### `GET /api/meetings/[id]`

Returns a single meeting. Responds `400` for a non-numeric id and `404` when no meeting matches.

## Status

Reading, searching, pagination, creating, editing, and deleting meetings are complete. There is no authentication yet, so the create, edit, and delete controls are available to every visitor.

## License

Coursework for WDD 430 at BYU-Idaho. Not licensed for reuse.
