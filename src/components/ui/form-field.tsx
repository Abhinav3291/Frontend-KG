import * as React from "react";
import { cn } from "../../lib/utils";

export interface FormFieldProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    label?: string;
    htmlFor?: string;
    error?: string;
    required?: boolean;
    description?: string;
    className?: string;
    children?:
        | React.ReactElement<React.HTMLAttributes<HTMLElement> & { id?: string }>
        | ((props: { id: string; "aria-invalid": boolean }) => React.ReactNode);
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
    (
        {
            label,
            htmlFor,
            error,
            required = false,
            description,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const id = React.useId();
        const inputId = htmlFor || id;

        let renderedChild: React.ReactNode;

        if (typeof children === "function") {
            renderedChild = children({
                id: inputId,
                "aria-invalid": !!error,
            });
        } else if (React.isValidElement(children)) {
            renderedChild = React.cloneElement(children, {
                id: inputId,
                "aria-invalid": error ? "true" : "false",
                ...children.props,
            });
        } else {
            renderedChild = children;
        }

        return (
            <div ref={ref} className={cn("space-y-2 w-full", className)} {...props}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                {renderedChild}

                {error && (
                    <p className="text-sm text-red-600" id={`${inputId}-error`}>
                        {error}
                    </p>
                )}

                {description && !error && (
                    <p className="text-sm text-gray-500" id={`${inputId}-description`}>
                        {description}
                    </p>
                )}
            </div>
        );
    }
);

FormField.displayName = "FormField";

export { FormField };
