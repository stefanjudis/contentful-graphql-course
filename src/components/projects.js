import React from 'react';

function Project({ project }) {
  const { title, image, url } = project;
  return (
    <div className="max-w-xs w-full text-center">
      <img
        className="w-full object-cover object-center mx-auto rounded-lg"
        src={image.url}
        alt="avatar"
      />

      <div className="mt-2">
        <a className="text-lg font-medium text-gray-700 underline" href={url}>
          {title}
        </a>
      </div>
    </div>
  );
}

function Projects({ projects }) {
  return (
    <section className="bg-white container mx-auto p-6">
      <h2 className="text-gray-800 font-medium capitalize text-xl md:text-2xl">
        My projects
      </h2>

      <div className="flex items-center justify-center">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {projects.map((project) => (
            <Project project={project} key={project.sys.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
