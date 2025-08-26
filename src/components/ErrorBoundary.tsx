import { Component, ErrorInfo, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { MagicalButton } from "@/components/MagicalButton";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Magical error caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="card-magical max-w-md text-center space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-magical font-bold text-foreground">
                  Oops! Something went wrong with the magic
                </h2>
                <p className="text-muted-foreground font-body">
                  Even the most powerful wizards encounter unexpected spells. 
                  Let's try to restore the magic!
                </p>
              </div>

              {this.state.error && (
                <div className="text-xs text-muted-foreground font-mono bg-muted/50 p-3 rounded-lg text-left">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <MagicalButton
                onClick={this.handleReset}
                magical
                className="font-magical"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restore Magic
              </MagicalButton>
              
              <MagicalButton
                onClick={() => window.location.href = "/"}
                variant="outline"
                className="font-magical"
              >
                Return to Castle
              </MagicalButton>
            </div>

            <div className="text-center">
              <blockquote className="text-sm font-body italic text-muted-foreground">
                "It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all."
              </blockquote>
              <p className="text-xs font-magical text-primary mt-2">
                — J.K. Rowling
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
};