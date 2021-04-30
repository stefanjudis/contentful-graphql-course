import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function Tag({ tag }) {
  const { title } = tag;
  return (
    <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full uppercase text-xs">
      {title}
    </span>
  );
}

function Bookmark({ bookmark }) {
  const { title, tagsCollection } = bookmark;
  return (
    <div className="max-w-sm mx-auto w-full px-4 py-3 bg-white shadow-md rounded-md space-y-1">
      <div className="flex items-center space-x-3">
        {tagsCollection.items.map((tag) => (
          <Tag tag={tag} key={tag.title} />
        ))}
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-800 mt-2">{title}</h1>
        {documentToReactComponents(bookmark.comment.json)}
      </div>
      <a
        href={bookmark.url}
        className="underline text-gray-800 font-bold py-2 rounded inline-flex items-center"
      >
        <span>Visit</span>
      </a>
    </div>
  );
}

function Bookmarks({ bookmarks }) {
  return (
    <section className="bg-white container mx-auto p-6">
      <h2 className="text-gray-800 font-medium capitalize text-xl md:text-2xl">
        My bookmarks
      </h2>

      <div className="flex items-center justify-center">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {bookmarks.map((bookmark) => (
            <Bookmark bookmark={bookmark} key={bookmark.sys.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Bookmarks;
