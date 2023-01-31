import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr, useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type ColumnProps = {
  title: string;
  key: string;
};
type TableProps = {
  children: ReactNode;
  columns: ColumnProps[];
  caption?: string;
  hasFooter?: boolean;
  variant?: "striped" | "unstyled" | "simple";
};
const DefaultTable = ({
  children,
  columns,
  caption,
  variant = "simple",
  hasFooter,
}: TableProps) => {
  return (
    <TableContainer>
      <Table variant={variant} colorScheme="gray" size={'md'}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          <Tr>
            {columns.map((column: ColumnProps) => (
              <Th key={column.key}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
        {hasFooter && (
          <Tfoot>
            <Tr>
              {columns.map((column: ColumnProps) => (
                <Th key={column.key}>{column.title}</Th>
              ))}
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
};

export default DefaultTable;
