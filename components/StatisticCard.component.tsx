import {Box, Flex, Icon, Stat, StatLabel, StatNumber, useColorModeValue,} from '@chakra-ui/react';
import {IconType} from "react-icons";

type Props = {
    title: string;
    stat: string | number | undefined;
    status: 'gain' | 'loss' | 'note' | 'balance';
    icon: IconType;
}
const StatisticCard = ({title, stat, status, icon}: Props) => {
    const handleColor = (): string => {
        switch (status) {
            case 'gain':
                return 'green.400';
            case 'loss':
                return 'red.400';
            case 'note':
                return 'gray.400';
            default:
                return 'gray.400';
        }
    };
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
                    <StatNumber fontSize={'xl'} fontWeight={'bold'} fontFamily={'Poppins'}
                        // @ts-ignore
                                color={handleColor}>
                        {stat ?? '---'}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon &&
                        <Icon boxSize={'40px'} as={icon}></Icon>
                    }
                </Box>
            </Flex>
        </Stat>

    );
};
export default StatisticCard;