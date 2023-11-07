//main.js

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { addNote, deleteNote, updateNote, reorderNotes } from "../store";
import { v4 as uuidv4 } from "uuid";

const CreateBtn = [{ name: "Create Note", icon: PlusIcon }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [noteId, setNoteId] = useState();
  const [noteContent, setNoteContent] = useState();

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const addNoteHandler = () => {
    if (modalTitle != "") {
      const newNote = { id: uuidv4(), title: modalTitle, content: "" };
      dispatch(addNote(newNote));
    }
  };

  const handleUpdateNote = () => {
    dispatch(updateNote({ id: noteId, content: noteContent }));
  };

  const modalTitleHandler = (event) => {
    setModalTitle(event.target.value);
  };

  const resetModalTitle = () => {
    if (modalTitle != "") {
      setModalTitle("");
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(noteContent);
  };

  const pasteContent = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setNoteContent(noteContent + text);
      })
      .catch((err) => {
        alert("Failed to read clipboard contents.");
      });
  };

  const clearContent = () => {
    setNoteContent("");
  };

  const handleContentChange = (event) => {
    setNoteContent(event.target.value);
  };

  const getTitleById = (id) => {
    const foundNote = notes.find((note) => note.id === id);
    return foundNote ? foundNote.title : null;
  };

  const getContentById = (id) => {
    const foundNote = notes.find((note) => note.id === id);
    return foundNote ? foundNote.content : null;
  };

  const setContentById = (id) => {
    const foundNote = notes.find((note) => note.id === id);
    setNoteContent(foundNote.content);
  };

  const deleteNoteById = () => {
    setNoteId(null);
    dispatch(deleteNote(noteId));
  };

  function dragStart(event, noteId) {
    event.dataTransfer.setData("text/plain", noteId);
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const sourceNoteId = event.dataTransfer.getData("text/plain");
    const targetNoteId = event.target.getAttribute("data-note-id");
    const sourceIndex = notes.findIndex((note) => note.id === sourceNoteId);
    const targetIndex = notes.findIndex((note) => note.id === targetNoteId);

    dispatch(reorderNotes({ sourceIndex, targetIndex }));
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <h1 className="ml-4 font-bold">Notepad</h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {CreateBtn.map((item) => (
                              <li key={item.name}>
                                <a
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                                  )}
                                  onClick={() => window.my_modal_1.showModal()}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your notes
                          </div>
                          <ul role="list" class="-mx-2 space-y-1">
                            {notes &&
                              notes.map((note) => (
                                <li key={note.id}>
                                  <a
                                    class={classNames(
                                      note.current
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:text-white hover-bg-gray-800",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                                    )}
                                    draggable="true"
                                    onDragStart={(event) =>
                                      dragStart(event, note.id)
                                    }
                                    onDragOver={allowDrop}
                                    onDrop={drop}
                                    data-note-id={note.id}
                                  >
                                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                      {note.title.charAt(0).toUpperCase()}
                                    </span>
                                    <span class="truncate">{note.title}</span>
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
              <h1 className="ml-4 font-bold">Notepad</h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {CreateBtn &&
                      CreateBtn.map((item) => (
                        <li key={item.name}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                            )}
                            onClick={() => window.my_modal_1.showModal()}
                          >
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your notes
                  </div>
                  <ul role="list" class="-mx-2 space-y-1">
                    {notes &&
                      notes.map((note) => (
                        <li key={note.id}>
                          <a
                            class={classNames(
                              note.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover-bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                            )}
                            draggable="true"
                            onDragStart={(event) => dragStart(event, note.id)}
                            onDragOver={allowDrop}
                            onDrop={drop}
                            data-note-id={note.id}
                          >
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                              {note.title.charAt(0).toUpperCase()}
                            </span>
                            <span class="truncate">{note.title}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="py-10 lg:pl-72 flex justify-center">
          {/* <-- Create Note Modal --> */}
          <div className="px-4 sm:px-6 lg:px-8">
            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">NEW NOTE</h3>
                <br />
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-2 inline-block bg-base-100 px-1 text-xs font-medium text-gray-200"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 bg-base-100 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="..."
                    onChange={modalTitleHandler}
                    value={modalTitle}
                  />
                </div>
                {modalTitle === "" && (
                  <span className="text-red-500">Title must not be blank.</span>
                )}
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      resetModalTitle();
                      addNoteHandler();
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      resetModalTitle();
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </dialog>
          </div>
          {/* <-- Create Note Modal --> */}

          {noteId && (
            <div className="w-4/5">
              <label
                htmlFor="comment"
                className="block text-2xl font-medium leading-6 text-gray-200"
              >
                {getTitleById(noteId)}
              </label>
              <div className="mt-4">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 bg-base-200 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={noteContent}
                  onChange={handleContentChange}
                />
              </div>

              {noteContent !== getContentById(noteId) && (
                <button
                  type="button"
                  className="rounded-md m-2 bg-[#1eb854] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => handleUpdateNote()}
                >
                  Save
                </button>
              )}

              <button
                type="button"
                className="rounded-md m-2 bg-[#1db990] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  copyContent();
                }}
              >
                Copy
              </button>

              <button
                type="button"
                className="rounded-md m-2 btn-accent px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  pasteContent();
                }}
              >
                Paste
              </button>

              <button
                type="button"
                className="rounded-md m-2 btn-warning px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  clearContent();
                }}
              >
                Clear
              </button>

              <button
                type="button"
                className="rounded-md m-2 bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  deleteNoteById();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
