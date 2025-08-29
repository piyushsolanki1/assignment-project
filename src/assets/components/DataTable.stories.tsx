import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";


type Column<T> = {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
  };
// Sample user data
type User = { id: number; name: string; email: string; age: number };
const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@email.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@email.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@email.com", age: 22 },
  { id: 4, name: "David", email: "david@email.com", age: 28 },
];

// Correctly type columns using Column<User>[]
const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

// Tell TypeScript the generic type of DataTable is <User>
const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    data: sampleData,
    columns: columns,
    variant: "default",
    selectable: true,
    rowsPerPage: 2,
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// Default table
export const Default: Story = {};

// Variants
export const Striped: Story = { args: { variant: "striped" } };
export const Bordered: Story = { args: { variant: "bordered" } };
export const Compact: Story = { args: { variant: "compact" } };

// States
export const Loading: Story = { args: { data: [], loading: true } };
export const Empty: Story = { args: { data: [] } };

// Extras
export const Selectable: Story = { args: { selectable: true } };
export const Pagination: Story = { args: { rowsPerPage: 2 } };
