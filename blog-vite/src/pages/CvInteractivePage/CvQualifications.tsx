'use client';

import CvParagraph from './CvParagraph';
import React from "react";

interface IElementProps {
  children: React.ReactNode;
}

function CvLeftTd({ children }: IElementProps) {
  return (
    <td className="w-[200px] font-bold border border-black p-2">
      {children}
    </td>
  );
}

function Td({ children }: IElementProps) {
  return (
    <td className="border border-black p-2">
      {children}
    </td>
  );
}

export default function CvQualifications() {
  return (
    <div>
      <CvParagraph text={'QUALIFICATIONS'} />
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <CvLeftTd>Core programming languages</CvLeftTd>
            <Td>
              C#, TypeScript, JavaScript , SQL, HTML, CSS, YAML, Python, Java
            </Td>
          </tr>
          <tr>
            <CvLeftTd>Development</CvLeftTd>
            <Td>
              ASP.NET / Core / 5, LINQ, SignalR, Entity Framework, ADO.NET,
              LLBLgen, MEF, DI React, Angular JS / 2-9v, jQuery, Jasmine,
              Bootstra Jest, Jasmine, Karma, OpenID, Nunit, Moq, WPF, UWP,
              Docker, RabbitMQ, Kafka, ReSharper, OAuth2
            </Td>
          </tr>
          <tr>
            <CvLeftTd>Databases</CvLeftTd>
            <Td>SQL Server, ElasticSearch, MongoDB, PostgreSQL, Oracle</Td>
          </tr>
          <tr>
            <CvLeftTd>Tools</CvLeftTd>
            <Td>
              Visual Studio / Code, DotCover, TFS, Jira, Jenkins, GIT, Source
              Tree, AntlR, npm, TeamCity, Rider, TortoiseSVN, Gulp{' '}
            </Td>
          </tr>
          <tr>
            <CvLeftTd>Development Methodologies:</CvLeftTd>
            <Td>
              OOP, BDD, TDD, DDD , MVC, MVP, MVVM, Event Sourcing, Agile(Scrum,
              Kanban), Continuous Integration
            </Td>
          </tr>
          <tr>
            <CvLeftTd>Cloud</CvLeftTd>
            <Td>Azure (websites , docker containers, sql server), AWS</Td>
          </tr>
          <tr>
            <CvLeftTd>Languages</CvLeftTd>
            <Td> Polish(Native) • English (C1+) • Spanish(A2) </Td>
          </tr>
          <tr>
            <CvLeftTd>Interests</CvLeftTd>
            <Td> Market / Stock trading • Mobile Phones • Bachata / Salsa</Td>
          </tr>
          <tr>
            <CvLeftTd>Others</CvLeftTd>
            <Td> Driver license (category B) • Yacht skipper • Foosball player</Td>
          </tr>
          <tr>
            <CvLeftTd>Achievements</CvLeftTd>
            <Td>
              Architect / Developer / Team leader in University project for
              Capgemini. Project won main prize in "Team engineering
              competition" at Wrocław University of Technology. ( Web
              multiplayer game - Ships ) Used: ASP.NET MVC, Entity Framework,
              Linq, SignalR, JavaScript
            </Td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
