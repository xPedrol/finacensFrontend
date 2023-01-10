import {Inter} from '@next/font/google';
import DefaultLayout from "../components/Layout.component";
import Box from "../components/Box.component";

const inter = Inter({subsets: ['latin']});

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <Box my={'20px'}>
                    dasdadas
                </Box>
            </DefaultLayout>
        </>
    );
}
