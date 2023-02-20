import {Box, Flex, Icon, Stat, StatLabel, StatNumber, useColorModeValue,} from '@chakra-ui/react';
import {IconType} from "react-icons";
import {getStatusColor} from "../utils/handleColor.utils";

type Props = {
    title: string;
    stat: string | number | undefined;
    status: 'gain' | 'loss' | 'note' | 'balance';
    icon: IconType;
}
const StatisticCard = ({title, stat, status, icon}: Props) => {
    return (
        <Stat
            px={{base: 2, md: 2}}
            py={'3'}
            border={'1px solid'}
            w={'100%'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box ps={{base: 2, md: 4}}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'lg'} fontWeight={'bold'} fontFamily={'Poppins'}
                        // @ts-ignore
                                color={getStatusColor(status)}>
                        {stat ?? '---'}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon &&
                        <Icon boxSize={'25px'} as={icon}></Icon>
                    }
                </Box>
            </Flex>
        </Stat>

    );
};
export default StatisticCard;