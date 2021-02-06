import moment, { Moment } from 'moment';

export interface IWorkUnit {
  placeWithDate: string;
  jobTitle: string;

  description?: string;

  projects?: IProject[];
  frontend: ISpecialization;
  backend: ISpecialization;
  devops: ISpecialization;
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
    jobTitle: 'Consultant',
    // description:

    //   'presentations)\n' +
    //   '',
    placeWithDate: 'Danske Bank (11.2019 – today) ',

    projects: [
      {
        name: 'eDoc',
        timeframe: {
          startDate: moment('2019-11'),
          endDate: moment('2020-06'),
        },
        description:
          'eDoc (automation of document management system, time saving and reducing costs of staff) – full stack\n' +
          'developer (gathering business requirements / implementation, guiding management and providing\n' +
          'solutions, code reviews teaching other developers, setting up development environments, cooperation with business\n',
      },
      {
        name: 'Digital Signing / AML',
        timeframe: {
          startDate: moment('2020-12'),
          endDate: moment('now'),
        },
        description:
          'Creating new fully digitalised credit / mortgage system - user is not required to appear physically in Bank. \n' +
          'Integration with 3rd party vendors in Azure / AWS',
      },
      {
        name: 'Onboarding (Special cases)',
        timeframe: {
          startDate: moment('2020-09'),
          endDate: moment('now'),
        },
        description:
          'System responsible for onboarding new special customers e.g. big money (Wealth management) ' +
          'like also poor kids without parents or immigrants without any documents.',
      },
    ],
    frontend: {
      description:
        'Design and implementation of new screens (forms) for document management, ' +
        'cooperation with other teams in setting up style guideline',
      techStack:
        'React, Hooks, Redux + Saga, Formik, Typescript, Visual Studio Code, Internal component library',
    },
    backend: {
      description:
        'Design and implementation of distributed system with microservices - to handle all internal document management traffic' +
        'Implementation of authentication, communication',
      techStack:
        'ASP.NET core / .NET 5, EntityFramework, SSMS, Rider, Ocelot, Microservices, WPF, OpenShift, Docker, Polly, RabbitMQ',
    },
    devops: {
      description:
        'Setting up CI  / CD, docker images for build pipelines and target artifacts ready to deploy in OpenShift, ' +
        'Setting infrastructure with terraform (databases / computing clusters, RabbitMQ etc.)' +
        'OpenShift / Kubernetes configuration e.g. routes / certificates, autoscaling, staging',
      techStack:
        'Terraform, Azure DevOps (CI / CD setup with .yaml, self hosted agent pool management), managment of firewall filtering rules)' +
        'OpenShift, Kubernetes, JFrog artifactory',
    },
  },
  {
    placeWithDate: 'NaviBud (03.2017 – today)',
    jobTitle: 'Lead developer',
    description:
      'Full stack architect and team leader\n' +
      'Remote – construction industry startup, our target is to reduce time of travel between customers and\n' +
      'delivery of complex CRM which will automate the sell process, (implementation of business requirements,\n' +
      'providing solutions,',
    frontend: {
      description:
        'Design and implementation of new screens (forms) for document management, ' +
        'cooperation with other teams in setting up style guideline',
      techStack:
        'React, Hooks, Redux + Saga, Formik, Typescript, Visual Studio Code, Internal component library',
    },
    backend: {
      description:
        'Design and implementation of distributed system with microservices - to handle all internal document management traffic' +
        'Implementation of authentication, communication',
      techStack:
        'ASP.NET core 3, Angular 9, SQL server, EF, Azure, Docker, Nginx, Java, Spring Boot',
    },
    devops: {
      description:
        'Setting up CI  / CD, docker images for build pipelines and target artifacts ready to deploy in OpenShift, ' +
        'Setting infrastructure with terraform (databases / computing clusters, RabbitMQ etc.)' +
        'OpenShift / Kubernetes configuration e.g. routes / certificates, autoscaling, staging',
      techStack: 'Terraform, Azure DevOps - CI /CD pipelines',
    },
  },
  {
    placeWithDate: 'Credit Suisse (06.2019 – 11.2019)',
    jobTitle: 'Consultant / Lead Developer',
    description:
      'FRTB CVA (Fundamental Review of the Trading Book) – Basel III implementation, government directive,\n' +
      'Fully automated calculation of all trade risks - stocks / options / FX etc.\n' +
      'System design and implementation / gathering business requirements / presentations',
    techStack:
      'React, Typescript, RxJs, ASP.NET, SQL server, EntityFramework Primo Grid (internal grid),\n' +
      'TFS (Repos, Boards, Test Plans)',
  },
  {
    placeWithDate: 'Bank for International Settlements (07.2018 – 03.2019)',
    jobTitle: ' Full stack developer',
    description:
      'Switzerland – Confidential (Security systems, ERP, DataHubs), adding enhancements for existing\n' +
      'workflows e.g. access / document management etc., as far as creating brand new flows with UI',
    techStack:
      'C#, ASP.NET web api, Microsoft workflow foundation, React, Angular 1.6 and 6-7, Quartz,\n' +
      'Entity Framework, SQL server, queues, SpecFlow, Moq, Nunit, TFS, IOS development\n' +
      'TFS (Repos, Boards, Test Plans, self hostet, release management)',
  },
  {
    placeWithDate:
      'The Bank of New York Mellon Corporation (01.2018 – 07.2018)',
    jobTitle: 'Specialist Developer (Vice President) ',
    description:
      'Green field project based on internal cloud with microservices in Docker containers',
    techStack:
      '.NET Core 2 , Kafka, EF core, sqlServer 2014, Xunit, Nsubstitute, Angular5, AgGrid,\n' +
      'HTML / CSS + TypeScript, Karma + Jasmine, Jenkins + PowerShell / MsBuild',
  },
  {
    placeWithDate: 'Valentinite',
    jobTitle: 'Backend Developer (08.2017- 12.2017)',
    description:
      'Improvement of Allexis – application responsible for sharing data, nondisclosure agreement',
    techStack:
      '(.NET core 2, ElasticSearch, PostgreSql, NUnit, AWS, ActiveMQ, React, CSS/HTML, NAnt)\n' +
      'Creating application for sharing data and localization.\n',
  },
  {
    placeWithDate: 'Credit Suisse',
    jobTitle: 'Technical analyst (04.2016 – 07.2017)',
    description:
      'IImprovement of MDS – Market data server, writing web and desktop apps for internal usage.',
    techStack:
      'Frontend - React. TSX, MobX, HTML, CSS, Webpack 2, Jasmine, Karma\n' +
      'Backend - C#, ASP.NET Web API 2, Elasticsearch, Coherence, Nunit, Moq, Python, Django, Java\n' +
      'Desktop -WPF MVVM + XAML, MahApps Metro UI, AntlR',
  },
  {
    placeWithDate: 'Ceneo.pl',
    jobTitle: 'Junior Developer (01.2016- 03.2016)',
    description: 'Developing of biggest Polish price comparison website',
    techStack:
      'ASP.NET MVC ElasticSearch, MongoDB, Redis,\n' +
      'SQL server, RabbitMq, NUnit, CastleWindsor, javaScript, jQuery, HTML)',
  },
  {
    placeWithDate: 'Unit4',
    jobTitle: 'Junior Software Engineer (07.2015- 12.2015)',
    description: 'Developing of biggest Polish price comparison website',
    techStack:
      '(Developing Agresso, an ERP system with C# .NET, TopGen and SQL server,\n' +
      'NUnit, Rhino Mocks 80% test coverage)\n',
  },
  {
    placeWithDate: 'Volvo IT',
    jobTitle: 'Internship (06.2014-09.2014)',
    description:
      'Developing internal application for bus technical condition analysis.',
    techStack: 'Java JSF, HTML, CSS,\n' + 'JavaScript, SAXParser XML)',
  },
];
