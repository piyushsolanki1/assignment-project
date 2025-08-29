import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    label: "Example Label",
    placeholder: "Type something...",
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Default
export const Default: Story = {};

// Variants
export const Filled: Story = { args: { variant: "filled" } };
export const Outlined: Story = { args: { variant: "outlined" } };
export const Ghost: Story = { args: { variant: "ghost" } };

// Sizes
export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };

// States
export const Disabled: Story = {
  args: { disabled: true, value: "Can't edit me" },
};
export const Invalid: Story = {
  args: { invalid: true, errorMessage: "This field is required" },
};
export const WithHelperText: Story = {
  args: { helperText: "Helper message here" },
};

// Extras
export const Clearable: Story = {
  args: { clearable: true, value: "Clear me" },
};
export const PasswordToggle: Story = {
  args: { type: "password", showPasswordToggle: true },
};
