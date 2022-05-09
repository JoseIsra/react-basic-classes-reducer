import React, { useState, useEffect, useReducer } from "react";

const initialState = {
  loading: false,
  exist: false,
  error: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  CONFIRM: {
    ...state,
    exist: false,
    deleted: true,
  },
  CHECK_CODE: {
    ...state,
    loading: true,
    exist: false,
  },
  RESET: {
    ...state,
    exist: false,
    deleted: false,
  },
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  EXIST_CODE: {
    ...state,
    error: false,
    exist: true,
    loading: false,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

const SECURITY_CODE = "onomatopeya";

export function UseReducer({ name }) {
  const [value, setValue] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          dispatch({
            type: "ERROR",
          });
          return;
        }
        dispatch({
          type: "",
        });
        dispatch({ type: "EXIST_CODE" });
      }, 2000);
    }
  }, [state.loading]);

  const checkCode = (e) => {
    e.preventDefault();
    dispatch({
      type: "CHECK_CODE",
    });
  };

  const handleConfirmation = () => {
    setValue("");
    dispatch({ type: "CONFIRM" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };
  if (!state.exist && !state.deleted) {
    return (
      <div className="p-10 flex-col border-2 border-green-900 items-center justify-center">
        <h2 className="text-center text-gray-800 text-2xl">Eliminar {name}</h2>
        <p className="text-gray-500 text-xl text-center">
          Por favor indique el código de seguridad para eliminar el contenido
        </p>
        {state.error && !state.loading && (
          <p className="text-red-400 font-medium">
            Código incorrecto, intente otro
          </p>
        )}
        {state.loading && (
          <p className="text-blue-400 font-medium">Cargando..</p>
        )}
        <div className="flex items-center justify-center m-4">
          <form onSubmit={checkCode}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="p-3 rounded-sm"
              type="text"
            />
            <button
              type="submit"
              className=" rounded-md p-2 bg-red-500 cursor-pointer hover:scale-110 ease-in duration-300 text-slate-300"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    );
  } else if (state.exist && !state.deleted) {
    return (
      <div className="p-10 flex-col border-2 border-green-900 items-center justify-center">
        <p className="text-center font-medium text-lg text-slate-300">
          Código correcto, quiere eliminarlo?
        </p>
        <div className="flex items-center justify-center m-4">
          <button
            className="bg-green-600 p-2 rounded cursor-pointer hover:scale-110 ease-in duration-300 text-slate-300"
            onClick={handleConfirmation}
          >
            Sí, proceder
          </button>
          <button
            className="mx-3 rounded-md p-2 bg-red-500 cursor-pointer hover:scale-110 ease-in duration-300 text-slate-300"
            onClick={reset}
          >
            No,volver
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-10 flex-col border-2 border-green-900 items-center justify-center">
        <p className="text-center tfont-bold text-md">Weel done my friend</p>
        <button
          className="bg-cyan-500 rounded p-2 font-medium hover:scale-110 ease-in duration-300 text-slate-300"
          onClick={reset}
        >
          Eliminar otro código
        </button>
      </div>
    );
  }
}
