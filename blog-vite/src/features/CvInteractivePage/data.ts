import moment, { Moment } from 'moment';

export interface IWorkUnit {
  placeWithDate: string;
  jobTitle: string;

  description?: string;

  /** Osiągnięcia z metrykami — renderowane zawsze, niezależnie od filtrów specjalizacji. */
  highlights?: string[];

  projects?: IProject[];
  frontend?: ISpecialization;
  backend?: ISpecialization;
  devops?: ISpecialization;
  ai?: ISpecialization;
}

export interface IProject {
  timeframe: {
    startDate: Moment;
    endDate: Moment;
  };

  name: string;
  description: string;
}

export interface ISpecialization {
  description: string;
  techStack: string;
}

export const CvData: IWorkUnit[] = [
  {
    placeWithDate: 'Innergy (11.2024 – present)',
    jobTitle: 'Full-Stack & AI Engineer — vertical ERP (woodworking)',
    description:
      'Client-facing delivery for a US-based ERP vendor. Acting as a self-sufficient engineer: gathering requirements directly with clients, ' +
      'implementing features and presenting to stakeholders without separate analysts. ' +
      'Reusing and integrating AI/LLM models into accounting and operational modules, deployed at client sites.',
    highlights: [
      'Built AI / agentic capabilities into the ERP (LLM-assisted workflows, chatbots, automation) shipped to production at client sites — improving the customer experience and contributing to ~2× growth in tenants, while support kept pace with the larger user base.',
      'Participated in cutting developer bug-fixing time ~3× and shortening project estimation from days to hours through AI-assisted tooling.',
      'Migrated the front end from Angular to React; built new product features and owned architecture decisions.',
    ],
    frontend: {
      description: 'Migration from Angular to React, building 3D modelling UI',
      techStack: 'React, TypeScript, Three.js, Angular, Redux',
    },
    backend: {
      description: 'ERP accounting and operational modules, microservices',
      techStack: 'C#, ASP.NET, .NET 10, microservices, Python (async, FastAPI, Celery)',
    },
    ai: {
      description: 'LLM-assisted workflows, chatbots and agentic automation shipped to production',
      techStack:
        'LangChain, LangGraph, RAG, embeddings, pgvector / Azure AI Search, FastMCP, Claude Code agents, ' +
        'Semantic Kernel, OpenAI / Anthropic / Azure OpenAI',
    },
    devops: {
      description: 'CI/CD pipelines with containerized deployments',
      techStack: 'Azure / AWS, GitLab CI, Docker, Docker Compose',
    },
  },
  {
    placeWithDate: 'Point72 (11.2021 – 09.2024)',
    jobTitle: 'Consultant — Full-Stack Engineer (Macro)',
    description:
      'Repo Trading Client (RTC), Advanced Margin Project (AMP) and Broker Strategy. ' +
      'Migrated legacy .NET Framework systems to .NET 8 and built new applications end to end, including UI/UX; ' +
      'gathered requirements, ran code reviews and mentored developers.',
    highlights: [
      'Replaced traders’ manual Excel calculations and cross-system data gathering with a single system that auto-aggregates data before and after each trading session — saving traders ~2 hours per day.',
      'Strengthened system monitoring and fault tolerance, enabling near-instant detection of and response to anomalies.',
    ],
    frontend: {
      description: 'Building trading and margin management UI',
      techStack: 'React, Hooks, Redux-Saga, TypeScript, Formik, Glue42, Cypress',
    },
    backend: {
      description: 'Migration .NET 4.5 to .NET 8, microservices architecture',
      techStack: 'ASP.NET, Entity Framework, Java, microservices',
    },
    devops: {
      description: 'CI/CD with Azure DevOps, containerized deployments',
      techStack:
        'OpenShift, Docker, Terraform, Azure / AWS DevOps (CI / CD, YAML pipelines, Repos, Boards, Test Plans, ' +
        'self hosted agent pool management), PowerShell',
    },
  },
  {
    jobTitle: 'Consultant — Full-Stack Engineer',
    placeWithDate: 'Danske Bank (11.2019 – 11.2021)',
    description:
      'eDoc — automation of document-management and approval workflows. ' +
      'Full-stack delivery (UI/UX through to backend and data), enhancements and maintenance.',
    highlights: [
      'Automated work previously done by dozens of analysts and cut the approval process from weeks to days.',
      'During the pandemic, delivered a fully electronic system for signing credit agreements remotely — including applicant credit scoring and creditworthiness calculation.',
    ],
    projects: [
      {
        name: 'eDoc',
        timeframe: {
          startDate: moment('2019-11'),
          endDate: moment('2020-06'),
        },
        description:
          'Automation of the document-management system — time saving and reducing staff costs. ' +
          'Full-stack delivery: gathering requirements, implementation, guiding management, code reviews, ' +
          'mentoring developers and setting up development environments.',
      },
      {
        name: 'Digital Signing / AML',
        timeframe: {
          startDate: moment('2020-12'),
          endDate: moment('2021-11'),
        },
        description:
          'New, fully digitalised credit / mortgage system — the applicant is not required to appear physically in the bank. ' +
          'Integration with 3rd-party vendors on Azure / AWS.',
      },
      {
        name: 'Onboarding (special cases)',
        timeframe: {
          startDate: moment('2020-09'),
          endDate: moment('2021-11'),
        },
        description:
          'System responsible for onboarding special customers — e.g. wealth-management clients, ' +
          'as well as vulnerable groups such as children without guardians or immigrants without documents.',
      },
    ],
    frontend: {
      description:
        'Design and implementation of new screens (forms) for document management, ' +
        'cooperation with other teams on the style guideline',
      techStack:
        'React, Hooks, Redux-Saga, Formik, TypeScript, Python, Django, internal component library',
    },
    backend: {
      description:
        'Design and implementation of a distributed microservices system handling all internal document-management traffic, ' +
        'including authentication and communication',
      techStack:
        'C#, ASP.NET Core / .NET 5, Entity Framework, Ocelot, microservices, Java, Spring, Hibernate, ' +
        'OpenShift, Docker, Polly, RabbitMQ',
    },
    devops: {
      description:
        'CI / CD, Docker images for build pipelines and deployable artifacts on OpenShift; ' +
        'infrastructure with Terraform (databases / compute clusters, RabbitMQ); OpenShift / Kubernetes configuration ' +
        '(routes / certificates, autoscaling, staging)',
      techStack:
        'Terraform, Azure DevOps (CI / CD with YAML, self hosted agent pool management), ' +
        'OpenShift, Kubernetes, JFrog Artifactory',
    },
  },
  {
    placeWithDate: 'Credit Suisse — FRTB CVA (06.2019 – 11.2019)',
    jobTitle: 'Consultant / Lead Developer',
    description:
      'Fundamental Review of the Trading Book (Basel III regulatory directive). ' +
      'Designed and implemented fully automated risk calculation across trades (equities, options, FX) over very large data volumes. ' +
      'Gathered requirements and presented to stakeholders.',
    frontend: {
      techStack: 'React, Redux, TypeScript, RxJS',
      description: 'Management dashboard for changing configuration in risk calculation',
    },
    backend: {
      techStack:
        'ASP.NET, Java, Spring, Hibernate, SQL Server, Entity Framework, Primo Grid (internal grid)',
      description: 'Handling configuration management and applying it between system runs',
    },
    devops: {
      description: 'Source control and delivery on TFS',
      techStack: 'TFS (Repos, Boards, Test Plans)',
    },
  },
  {
    placeWithDate: 'Bank for International Settlements — BIS (07.2018 – 03.2019)',
    jobTitle: 'Full-Stack Developer — Web Apps',
    description:
      'Confidential security systems, ERP and data hubs (Switzerland). ' +
      'Enhanced existing workflows (access / document management) and built new flows end to end with UI/UX.',
    frontend: {
      description: 'Implementation of internal web UIs',
      techStack: 'React, Angular, Redux, NgRx',
    },
    backend: {
      description: 'REST API creation and integration, reading from message queues',
      techStack:
        'C#, ASP.NET Web API, Microsoft Workflow Foundation, Quartz, Entity Framework, SQL Server, ' +
        'queues, Python, Django, SpecFlow, Moq, NUnit',
    },
    devops: {
      description: 'Running builds + pipeline configuration',
      techStack: 'TFS (Repos, Boards, Test Plans, self hosted, release management), PowerShell',
    },
  },
  {
    placeWithDate: 'BNY Mellon — Praeeo (01.2018 – 07.2018)',
    jobTitle: 'Specialist Developer (Vice President)',
    description:
      'Green-field project on internal cloud with microservices in Docker containers.',
    frontend: {
      description: 'Implementation of business requirements — creating and maintaining Angular pages',
      techStack: 'Angular 5, Redux, NgRx, AgGrid, HTML / CSS, TypeScript, Karma + Jasmine',
    },
    backend: {
      description: 'Integration with 3rd-party clients (REST / MQ), exposing REST APIs to internal and external clients',
      techStack:
        '.NET Core 2, Java EE, Hibernate, Kafka, EF Core, SQL Server, xUnit, NSubstitute',
    },
    devops: {
      description: 'Running builds + pipeline configuration',
      techStack: 'Jenkins, PowerShell / MsBuild',
    },
  },
  {
    placeWithDate: 'NaviBud (03.2017 – 07.2021)',
    jobTitle: 'Lead Developer / Full-Stack Architect',
    description:
      'Own company. Founder / architect of a CRM SaaS that automates the sales process for the construction sector — ' +
      'built from scratch and shipped to production.',
    highlights: [
      'Live SaaS with paying subscription customers; chose the stack, designed the architecture, and led a small development team (requirements, code reviews, mentoring).',
    ],
    frontend: {
      description: 'Design and implementation of the CRM UI/UX',
      techStack: 'Angular, Redux / NgRx, TypeScript',
    },
    backend: {
      description: 'Distributed backend for the CRM SaaS platform',
      techStack:
        'ASP.NET Core, Entity Framework, SQL Server, Java, Spring Boot, Python, Django',
    },
    devops: {
      description: 'Infrastructure with Terraform, containerized deployments and CI/CD',
      techStack: 'Azure, Docker, Nginx, Terraform, Azure DevOps (CI / CD, YAML pipelines)',
    },
  },
  {
    placeWithDate: 'Credit Suisse — Market Data Server (04.2016 – 07.2017)',
    jobTitle: 'Technical Analyst',
    description:
      'Improvement of MDS — Market Data Server; writing web and desktop apps for internal usage, ' +
      'including machine learning on trading data.',
    frontend: {
      description: 'Internal UI development for MDS cache management',
      techStack: 'React, TSX, MobX, Redux, NgRx, HTML, CSS, Webpack 2, Jasmine, Karma',
    },
    backend: {
      description:
        'Search engines and endpoints for MDS cache management (CRUD), query optimization; ' +
        'ML for trading-data qualification',
      techStack:
        'C#, ASP.NET Web API 2, Elasticsearch, Coherence, NUnit, Moq, Python, Django, Java, R (ML); ' +
        'Desktop — WPF / MVVM, XAML, MahApps Metro UI, ANTLR',
    },
  },
  {
    placeWithDate: 'Valentinite (08.2017 – 12.2017)',
    jobTitle: 'Backend Developer',
    description:
      'Improvement of Allexis — application responsible for sharing data under a non-disclosure agreement.',
    frontend: {
      description: 'Development and maintenance of the React components',
      techStack: 'React, CSS / HTML',
    },
    backend: {
      description:
        'Exposing REST endpoints for the front end, report generation and stored-procedure optimization',
      techStack:
        '.NET Core 2, Elasticsearch, PostgreSQL, NUnit, AWS, ActiveMQ, NAnt, Pentaho',
    },
  },
  {
    placeWithDate: 'Ceneo.pl (01.2016 – 03.2016)',
    jobTitle: 'Developer',
    description: 'Developing Poland’s largest price-comparison website.',
    frontend: {
      description: 'Modifying existing components and adding new ones to ceneo.pl',
      techStack: 'JavaScript, jQuery, HTML',
    },
    backend: {
      description:
        'Stored-procedure optimization, reading data from external services and report generation',
      techStack:
        'ASP.NET MVC, Elasticsearch, MongoDB, Redis, SQL Server, RabbitMQ, NUnit, Castle Windsor',
    },
  },
  {
    placeWithDate: 'Unit4 (07.2015 – 12.2015)',
    jobTitle: 'Software Engineer',
    description: 'Development of Agresso — a major ERP system, with 80% test coverage.',
    frontend: {
      description: 'Adding business features to existing pages',
      techStack: 'Ext JS, JavaScript, HTML, CSS',
    },
    backend: {
      description: 'Exposing data to REST endpoints',
      techStack: 'C# .NET, TopGen, SQL Server, NUnit, Rhino Mocks',
    },
  },
  {
    placeWithDate: 'Volvo IT (06.2014 – 09.2014)',
    jobTitle: 'Internship',
    description:
      'Developing an internal application for bus technical-condition analysis.',
    frontend: {
      description: 'GUI for XML data management (bus information)',
      techStack: 'HTML, CSS, JavaScript',
    },
    backend: {
      description: 'Exposing XML data about buses to external services',
      techStack: 'Java EE, JSF, SAXParser XML',
    },
  },
];
