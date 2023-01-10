import {styled} from "@nextui-org/react";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    my?: string;
}
const Box = ({children, my}: Props) => {
    const Main = styled("div", {
        margin: `${my ?? '0'} auto`,
    });
    return (
        <>
            <Main>
                children
            </Main>
        </>
    );
};

export default Box;