import {Component, ErrorInfo, ReactNode, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error captured by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (e) {
      alert("스토리지 초기화에 실패했습니다: " + String(e));
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "40px 20px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          maxWidth: "600px",
          margin: "40px auto",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #e1e4ea",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "50px", marginBottom: "20px" }}>⚠️</div>
          <h1 style={{ fontSize: "22px", color: "#141b2b", fontWeight: "800", marginBottom: "12px" }}>
            시스템 오류가 발생했습니다
          </h1>
          <p style={{ fontSize: "14px", color: "#4f566b", lineHeight: "1.6", marginBottom: "24px" }}>
            상세페이지 메이커 실행 중 브라우저 호환성 또는 캐시 오류가 감지되었습니다. 아래의 복구 단추를 누르면 로컬 저장소를 리셋하고 정상 복구됩니다.
          </p>
          <div style={{
            textAlign: "left",
            backgroundColor: "#f4f5f8",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "monospace",
            color: "#e11d48",
            overflowX: "auto",
            marginBottom: "24px",
            maxHeight: "150px"
          }}>
            <strong>Error:</strong> {this.state.error?.message || "Unknown error"}<br />
            {this.state.error?.stack && <span style={{ opacity: 0.7, fontSize: "11px" }}>{this.state.error.stack}</span>}
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: "#5300b7",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              로컬 스토리지 초기화 후 새로고침 !
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#f4f5f8",
                color: "#4f566b",
                border: "1px solid #e1e4ea",
                padding: "12px 24px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              단순 새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

