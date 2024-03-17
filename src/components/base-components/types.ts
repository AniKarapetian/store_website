export interface AlertProps {
  message: string;
  type: AlertType;
}

export type AlertType = "success" | "info" | "warning" | "danger";
