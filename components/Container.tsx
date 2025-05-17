import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-3", className)}>
      {children}
    </div>
  );
};

export default Container;

// This component is a container that centers its children within a maximum width of 1280 pixels. It uses the `cn` utility function to conditionally apply classes, allowing for additional custom classes to be passed in via the `className` prop. The `children` prop is used to render any nested components or elements within the container.
// The `max-w-screen-xl` class sets the maximum width of the container to 1280 pixels, while `mx-auto` centers the container horizontally within its parent element. This is a common pattern in responsive web design, ensuring that content is displayed in a visually appealing and accessible manner across different screen sizes.
// The `className` prop allows for additional styling to be applied to the container, making it flexible and reusable in different contexts. The `children` prop is a special prop in React that allows components to pass data or elements to their children, enabling a modular and component-based architecture.
// The `Props` interface defines the expected structure of the props that the `Container` component will receive. It includes an optional `className` string and a required `children` prop, which is of type `React.ReactNode`. This ensures that the component can accept any valid React element or string as its children, providing flexibility in how the component is used.
// The `Container` component is a simple yet effective way to create a responsive layout in a React application. By using utility classes from a CSS framework like Tailwind CSS, it allows for quick and easy styling without the need for custom CSS.
