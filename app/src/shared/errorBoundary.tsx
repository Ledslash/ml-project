import { Component } from 'react';
import mainStyles from '../styles/index.module.css';

export class ErrorBoundary extends Component<any, {hasError: boolean}> {
    constructor(props: any) {
        super(props)
            this.state = { hasError: false }
        }
      static getDerivedStateFromError() {
        return { hasError: true }
      }
      componentDidCatch(error: any, errorInfo: any) {
        console.log({ error, errorInfo })
      }
      render() {
        if (this.state.hasError) {
          return (
            <section className={mainStyles.centeredBody}>
                <h2>Hubo Error al Renderizar</h2>
                <div>
                    <button className={mainStyles.blueBtn} onClick={() => this.setState({ hasError: false })}>Reintentar</button>
                </div>
            </section>
          )
        }
        return this.props.children
      }
  }

export default ErrorBoundary;