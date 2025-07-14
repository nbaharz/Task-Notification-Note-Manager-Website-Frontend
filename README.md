# ABOARD: Task, Notification & Note Manager Website

## Definition and Aim of The Project
The goal of this project is to create a rich web application that includes time management, task planning, note-taking, notification management, and personal tracking.

The main features of the website are taking short daily notes, creating to-do lists, and setting reminders for events, appointments, or tasks. These properties are designed to help individuals manage both their personal and professional lives in a more organized and structured manner.

In addition, a module external services has been developed to combine users' search and monitoring activities performed on different platforms into a single interface. Thanks to this component, users can directly monitor data from various services within the system. Currently, the ability to send notifications to users when user-selected products are discounted on Amazon has been added. This allows users to keep informed about price changes in the products they are interested in without having to manually check.

The external services infrastructure will be expanded in the future with new external integrations such as NewsAPI and Gmail. This would enable consumers to access a broader range of information, such as news updates and particular email notifications, via a single, consolidated platform.

In summary, the goal of this project is to combine daily activities such as task management, note taking, reminder setting, and information collection from various external sources into a single unified and efficient digital interface rather than providing separate services, thereby reducing the user's mental burden.

## Frontend Architecture
The application uses a component-based design that takes advantage of capabilities of NextJs. The distinct responsibilities of each component support readability, scalability, and sustainability.
 
- **Pages:** Route-based components are defined in the /app folder using the Next.js App Router. For every page in the website there is a folder in the app folder such as Board and Home. In each of those folders there are page.tsx files that create the website url paths /Home and /Board.
- **Components:** Reusable UI items such as modals, navigation bar, and footer components /ui directory. These components are divided according to their responsibilities for later use in the page context and are accessed from the /ui folder and the code repetition is transmitted to it instead of redefining it in different places when necessary.
- **Context:** React Context API is used to state managements of components, this allows reaching common states from different components through centralized structure.
- **API Layer & Abstractions:** All API interactions are managed in the /api directory. For every controller in the backend structure, an API endpoint folder is created, and related endpoint files are created inside.
- **Hooks:** Custom React hooks encapsulate business logic, making the code more modular. These hooks can be used in different components without redefining.

**Authentication** is implemented using the React Context, and tokens are stored, produced at backend securely and included in API requests. A cookie is set to the user via the incoming token and the user performs their navigation on the site through this cookie.

**The centralized modal system** manages all modals in the project, providing consistent behavior for shared features between modals such as animations, ESC-to-close support, and outside-click handling.

**Responsive design** for various screen resolutions is achieved using Tailwind CSS properties. Load skeletons are applied to the components such as To-Do Lists and Note Grid, and when the user refreshes the page, the skeletons are shown to the user until the rendering process is done. This is a strategy used by most popular applications such as Youtube, in modern web technologies.

**Security issues** are solved by storing tokens only in HTTP cookies to prevent cross-site Decryption (XSS) attacks. All API requests are verified and protected using Carrier tokens.
