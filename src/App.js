import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import clsx from 'clsx';

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(true);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    weightAtBirth: '',
    apgarScore: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    weightAtBirth: '',
    apgarScore: '',
  });
  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Creare profil copil
                    </Dialog.Title>
                    <p className="mt-1">
                      <label htmlFor="firstName">Prenume</label>
                      <input
                        className={clsx('border rounded border-black ml-1', {
                          'border-red-800': errors.firstName,
                        })}
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                      />
                    </p>
                    {errors.firstName && (
                      <p className="mt-1 text-red-800">{errors.firstName}</p>
                    )}
                    <p className="mt-1">
                      <label htmlFor="lastName">Nume</label>
                      <input
                        className={clsx('border rounded border-black ml-1', {
                          'border-red-800': errors.lastName,
                        })}
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                      />
                    </p>
                    {errors.lastName && (
                      <p className="mt-1 text-red-800">{errors.lastName}</p>
                    )}
                    <p className="mt-1">
                      <label htmlFor="dateOfBirth">Data nasterii</label>
                      <input
                        className={clsx('border rounded border-black ml-1', {
                          'border-red-800': errors.dateOfBirth,
                        })}
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={values.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </p>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-red-800">{errors.dateOfBirth}</p>
                    )}
                    <p className="mt-1">
                      <label htmlFor="weightAtBirth">
                        Greutatea la nastere (g)
                      </label>
                      <input
                        className={clsx('border rounded border-black ml-1', {
                          'border-red-800': errors.weightAtBirth,
                        })}
                        type="text"
                        pattern="[0-9]*"
                        name="weightAtBirth"
                        id="weightAtBirth"
                        value={values.weightAtBirth}
                        onChange={handleInputChange}
                      />
                    </p>
                    {errors.weightAtBirth && (
                      <p className="mt-1 text-red-800">
                        {errors.weightAtBirth}
                      </p>
                    )}
                    <p className="mt-1">
                      <label htmlFor="dateOfBirth">Nota APGAR</label>
                      <input
                        className={clsx('border rounded border-black ml-1', {
                          'border-red-800': errors.apgarScore,
                        })}
                        type="text"
                        name="apgarScore"
                        id="apgarScore"
                        value={values.apgarScore}
                        onChange={handleInputChange}
                      />
                    </p>
                    {errors.apgarScore && (
                      <p className="mt-1 text-red-800">{errors.apgarScore}</p>
                    )}
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Salveaza profil
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
function validateForm(values, isRegister) {
  const validation = {
    errors: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      weightAtBirth: '',
      apgarScore: '',
    },
    isValid: true,
  };

  if (isRegister) {
    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName =
        'Te rugam sa introduci prenumele copilului.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName =
        'Te rugam sa introduci numele de familie al copilului.';
    }

    if (!values.dateOfBirth) {
      validation.isValid = false;
      validation.errors.dateOfBirth =
        'Te rugam sa introduci data de nastere copilului.';
    }

    if (!values.weightAtBirth) {
      validation.isValid = false;
      validation.errors.weightAtBirth =
        'Te rugam sa introduci greutatea la nastere a copilului (g).';
    }

    if (!values.apgarScore) {
      validation.isValid = false;
      validation.errors.apgarScore =
        'Te rugam sa introduci nota APGAR primita la nastere.';
    }
  }

  return validation;
}
