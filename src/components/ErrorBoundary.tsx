import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020711] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-3xl font-black mb-4">
            O
          </div>
          <h1 className="text-2xl font-bold mb-2">OmniChurch</h1>
          <p className="text-sm text-gray-300 max-w-md mb-6">
            Yon ti pwoblèm afichaj te rive. Klike anba a pou relanse aplikasyon an:
          </p>
          <button
            onClick={() => {
              try {
                localStorage.clear();
              } catch (e) {}
              window.location.reload();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087cff] to-[#00b4d8] text-white font-semibold shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            Relanse sit la
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
