import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import clsx from 'clsx';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
    userRole: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    firstName: '',
    lastName: '',
    userRole: '',
    serverError: '',
  });
  const { login, accessToken } = useAuthContext();

  const { pathname } = useLocation();
  const isRegister = pathname === '/register';

  if (accessToken) {
    return <Navigate to="/" />;
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values, isRegister);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    let apiPath = 'register';
    if (!isRegister) {
      dataForServer = {
        email: values.email,
        password: values.password,
      };
      apiPath = 'login';
    }

    const data = await fetch(`http://localhost:3005/api/${apiPath}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }

    login(data);
  }

  return (
    <>
      <h1 className="w-full text-3xl font-bold text-center">
        {isRegister ? 'Creare cont nou' : 'Conectare cu cont existent'}
      </h1>
      {errors.serverError && (
        <p className="mt-1 text-red-800 bg-red-300 rounded w-96 m-auto p-3">
          <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
          {errors.serverError}
        </p>
      )}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <p className="mt-1">
            <label htmlFor="email">Email</label>
            <input
              className={clsx('border rounded border-black ml-1', {
                'border-red-800': errors.email,
              })}
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </p>
          {errors.email && <p className="mt-1 text-red-800">{errors.email}</p>}
          <p className="mt-1">
            <label htmlFor="password">Parola</label>
            <input
              className={clsx('border rounded border-black ml-1', {
                'border-red-800': errors.password,
              })}
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </p>
          {errors.password && (
            <p className="mt-1 text-red-800">{errors.password}</p>
          )}

          {isRegister && (
            <>
              <p className="mt-1">
                <label htmlFor="retype_password">Confirmare parola</label>
                <input
                  className={clsx('border rounded border-black ml-1', {
                    'border-red-800': errors.retype_password,
                  })}
                  type="password"
                  name="retype_password"
                  id="retype_password"
                  value={values.retype_password}
                  onChange={handleInputChange}
                />
              </p>
              {errors.retype_password && (
                <p className="mt-1 text-red-800">{errors.retype_password}</p>
              )}
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
                <label htmlFor="userRole">Rol</label>
                <input
                  className={clsx('border rounded border-black ml-1', {
                    'border-red-800': errors.userRole,
                  })}
                  type="text"
                  name="userRole"
                  id="userRole"
                  value={values.userRole}
                  onChange={handleInputChange}
                />
              </p>
              {errors.userRole && (
                <p className="mt-1 text-red-800">{errors.userRole}</p>
              )}
            </>
          )}
          <p className="mt-1">
            <button className="rounded bg-teal-500 text-teal-900 px-2 py-1 cursor-pointer">
              {isRegister ? 'Creare cont nou' : 'Conectare'}
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

function validateForm(values, isRegister) {
  const validation = {
    errors: {
      email: '',
      password: '',
      retype_password: '',
      firstName: '',
      lastName: '',
      userRole: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex*/
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Te rugam sa introduci o adresa valida de email.';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      'Te rugam sa introduci o parola cu o lungime de minim 6 caractere.';
  }

  if (isRegister) {
    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = 'Parolele introduse nu coincid.';
    }

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = 'Te rugam sa introduci prenumele tau.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName =
        'Te rugam sa introduci numele tau de familie.';
    }

    if (!values.userRole) {
      validation.isValid = false;
      validation.errors.userRole =
        'Te rugam sa alegi tipul de utilizator in aplicatie.';
    }
  }

  return validation;
}
