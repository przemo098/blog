import moment, { Moment } from 'moment';

export interface IWorkUnit {
  placeWithDate: string;
  jobTitle: string;
  description?: string;
  projects?: IProject[];
  frontend?: ISpecialization;
  backend?: ISpecialization;
  devops?: ISpecialization;
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
  // Add more work experience data as needed
]; 