import {Box, Flex, SimpleGrid, Skeleton, Stat, StatLabel, StatNumber, useColorModeValue,} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {MdOutlineAttachMoney, MdOutlineMoneyOffCsred} from "react-icons/md";

interface StatsCardProps {
    title: string;
    stat: string | number | undefined;
    icon: ReactNode;
    isGain: boolean;
}

function StatsCard(props: StatsCardProps) {
    const {title, stat, icon,isGain} = props;
    return (
        <Stat
            px={{base: 2, md: 4}}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{base: 2, md: 4}}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'xl'} fontWeight={'bold'} fontFamily={'Poppins'} color={isGain?'green.400':'red.400'}>
                        {stat?stat.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }):'---'}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

type Props = {
    gains: number;
    losses: number;
}
const ExpenseCard = ({gains, losses}: Props) => {
    return (
        <Box maxW="4xl" mx={'auto'}>
            <SimpleGrid columns={{base: 1, md: 2}} spacing={{base: 5, lg: 8}}>
                <StatsCard isGain={true}
                    title={'Gain'}
                    stat={gains}
                    icon={<MdOutlineAttachMoney size={'3em'}/>}
                />
                <StatsCard isGain={false}
                    title={'Loss'}
                    stat={losses}
                    icon={<MdOutlineMoneyOffCsred size={'3em'}/>}
                />
            </SimpleGrid>
        </Box>
    );
};
export default ExpenseCard;