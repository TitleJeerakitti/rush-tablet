import React from 'react';
import { View, } from 'react-native';
import { LinearHeader } from '../LinearHeader';
import { ContainerBorderRadiusTop } from '../ContainerBorderRadiusTop';
import { EmptyView } from '../EmptyView';

const MenuManageContainer = ({ children, colors, emptyText, condition, title, }) => {
    return (
        <View style={{ flex: 1, }}>
            <LinearHeader color={colors}>
                {title}
            </LinearHeader>
            <ContainerBorderRadiusTop>
                <EmptyView
                    emptyText={emptyText}
                    condition={condition}
                >
                    {children}
                </EmptyView>
            </ContainerBorderRadiusTop>
        </View>
    );
};

export { MenuManageContainer };
