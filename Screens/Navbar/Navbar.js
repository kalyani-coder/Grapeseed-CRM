// Navbar.js
import React from 'react';
import { Image, HStack, IconButton, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Navbar = () => {
    return (
        <HStack
            bg="black"
            px="1"
            py="3"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
        >
            <HStack spaceBetween alignItems="center">
                <Image
                    source={{
                        uri: 'https://th.bing.com/th/id/OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw?rs=1&pid=ImgDetMain',
                    }}
                    style={{ width: 30, height: 30, resizeMode: 'contain', color: 'white' }}
                />
            </HStack>
            <IconButton
                icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />}
            />
        </HStack>
    );
};

export default Navbar;
