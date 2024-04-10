'use client'
import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Person {
    id: string;
    firstName: string;
    // Add other properties as needed
}

export default function SearchBar(): JSX.Element {
    const USER_API_BASE_URL = "http://localhost:8191/api/v1/users";
    
    const [people, setPeople] = useState<Person[]>([]);
    const [selected, setSelected] = useState<Person | null>(null);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(USER_API_BASE_URL, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const users: Person[] = await response.json();
                setPeople(users);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const filteredPeople = people.filter(person =>
        person.firstName.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
    );

    return (
        <div className="w-72">
            <Combobox value={selected} onChange={setSelected}>
                <div className="mt-1">
                    <div className="w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            name='search' id='search' type='text'
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-white"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="overflow-hidden m-[-0.6rem] relative  inset-y-0 right-[-16rem] top-[-1rem] flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="fixed mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map(person => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {person.firstName}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={` inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
