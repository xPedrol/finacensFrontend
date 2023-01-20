import {Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue,} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {BsDiamondHalf, BsXDiamond} from 'react-icons/bs';
import {BiDiamond} from "react-icons/bi";

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
    const {title, stat, icon} = props;
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
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
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

const ExpenseCard = () => {
    return (
        <Box maxW="6xl" mx={'auto'}>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={{base: 5, lg: 8}}>
                <StatsCard
                    title={'Despesas'}
                    stat={'5,000'}
                    icon={<BsXDiamond size={'3em'}/>}
                />
                <StatsCard
                    title={'Servers'}
                    stat={'1,000'}
                    icon={<BiDiamond size={'3em'}/>}
                />
                <StatsCard
                    title={'Datacenters'}
                    stat={'7'}
                    icon={<BsDiamondHalf size={'3em'}/>}
                />
            </SimpleGrid>
        </Box>
    );
};
export default ExpenseCard;