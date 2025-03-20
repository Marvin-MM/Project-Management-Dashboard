# Complete Project Management Dashboard

## Overview

The Project Management Dashboard is a comprehensive application designed to help users manage their projects efficiently. This application provides a user-friendly interface for creating, tracking, and managing projects, with features such as task management, progress tracking, and team collaboration.

## Features

- **Project Management**: Create, edit, and manage projects.
- **Task Management**: Add tasks to projects and assign team members.
- **Progress Tracking**: Monitor the progress of tasks and projects.
- **Team Collaboration**: Collaborate with team members on projects.

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, Redux Toolkit, Redux Toolkit Query, Material UI Data Grid
- **Backend**: Node.js with Express, Prisma (PostgreSQL ORM)
- **Database**: PostgreSQL, managed with PgAdmin
- **Authentication**: Clerk

## Getting Started

### Prerequisites

Ensure you have these tools installed:

- Git
- Node.js
- npm (Node Package Manager)
- PostgreSQL ([download](https://www.postgresql.org/download/))
- PgAdmin ([download](https://www.pgadmin.org/download/))

### Installation Steps

1. Clone the repository:
   `git clone [git url]`
   `cd project-management`

2. Install dependencies in both client and server:
   `cd client`
   `npm i`
   `cd ..`
   `cd server`
   `npm i`

3. Set up the database:
   `npx prisma generate`
   `npx prisma migrate dev --name init`
   `npm run seed`

4. Configure environment variables:

- `.env` for server settings (PORT, DATABASE_URL)
- `.env.local` for client settings (NEXT_PUBLIC_API_BASE_URL)

5. Run the project
   `npm run dev`

## License

This project is licensed under the MIT License.
