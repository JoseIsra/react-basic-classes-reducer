import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "onomatopeya";

class ClassState extends React.Component {
  constructor(props) {
    super(props); // no olvidar al  super en una clase de REACT
    this.handleChange = this.handleChange.bind(this);
    this.checkCode = this.checkCode.bind(this);
    this.state = {
      error: false,
      inputModel: "",
      loading: false,
      exist: false,
    };
  }
  // componentWillMount() {
  //   /*
  //   Referencia a useEffect con dependencia de array vacío,
  //   solo se ejecuta una sola vez al cargar
  //   el componente.
  // No reacciona a cambios de estados
  //   */
  // }
  // componentDidMount() {
  //   /* NO SE EJECUTA CONTINUAMENTE AL HACER CAMBIOS
  //   EN LOS ESTADOS */
  //   console.log("componentDidMount");
  // }

  componentDidUpdate() {
    // se ejecuta cada vez que actualizamos nuestro estado
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
        if (this.state.inputModel !== SECURITY_CODE) {
          this.setState({
            error: true,
          });
          return;
        }
        this.setState({
          exist: true,
          error: false,
          inputModel: "",
        });
      }, 3000);
    }
  }

  handleChange(e) {
    this.setState({ inputModel: e.target.value });
  }
  checkCode(e) {
    e.preventDefault();
    this.setState({ loading: true });
  }
  render() {
    const { name } = this.props;
    return (
      <div className="p-10 border-2 border-green-900">
        <h2 className="text-center text-gray-800 text-2xl">Eliminar {name}</h2>
        <p className="text-center text-gray-500 text-xl">
          Por favor indique el código de seguridad para eliminar el contenido
        </p>
        {this.state.error && !this.state.loading && (
          <p className="text-red-400 font-medium">Código incorrecto</p>
        )}
        {this.state.loading && <Loading />}
        {this.state.exist && (
          <p className="text-green-400 font-medium">
            Código eliminado correctamente
          </p>
        )}

        <div className="flex items-center justify-center m-4">
          <form onSubmit={this.checkCode}>
            <input
              value={this.state.inputModel}
              onChange={this.handleChange}
              className="p-3 rounded"
              type="text"
            />
            <button
              type="submit"
              className="rounded-md p-2 bg-red-500 cursor-pointer hover:scale-110 ease-in duration-300 text-slate-300"
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export { ClassState };
