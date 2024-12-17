import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Animated, Modal, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';
import { GetObjectProperty, } from '../../utils/Helper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { MissingIcon } from '@react-navigation/elements';

const { width, height } = Dimensions.get('window');
const PostCreate = (props) => {
    const navigation = useNavigation();

    const [isPublic, setIsPublic] = useState(false);



    const TogglePublic = () => {
        setIsPublic(!isPublic);
    }

    return (
        <SafeAreaView style={[styles.container,]}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ padding: 10, gap: 10, }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', width: '99%' }}>
                        <TouchableOpacity onPress={navigation.goBack} >
                            <Image source={IconResource.clear} style={{ height: 24, width: 24 }} resizeMode='contain' />
                        </TouchableOpacity>
                        <View style={{ width: '90%', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', }}>{'Tạo bài viết'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, width: '90%', height: 60, alignItems: 'center' }}>
                        <Image source={ImagesResource.backBanner} style={{ height: 44, width: 44, borderRadius: 22, }} resizeMode='cover' />
                        <View style={{ flexDirection: 'column', gap: 5, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text style={{ color: '#000', fontSize: 16 }}>{'Thuong'}</Text>
                                <Image source={IconResource.verified} style={{ height: 16, width: 16 }} resizeMode='contain'></Image>
                            </View>

                            <TouchableOpacity onPress={TogglePublic} style={{ alignItems: 'center', height: 28, gap: 5, justifyContent: 'center', borderWidth: 1, borderRadius: 8, borderColor: '#00000008', backgroundColor: '#F3F4F6', flexDirection: 'row', padding: 6 }}>
                                <Image source={IconResource.theEarth} style={{ width: 16, height: 16 }} resizeMode='contain' />
                                <Text>{'Công khai'}</Text>
                                <Image source={IconResource.chevronDown} style={{ width: 20, height: 20, transform: [{ rotate: isPublic ? '180deg' : '0deg' }] }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={{ flex: 1 }}>
                    <TextInput multiline={true} placeholder='Hãy viết gì đó cho hôm nay' style={{}} />
                </View>
                <View style={{ paddingHorizontal: 20, height: 52, borderTopColor: '#00000008', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image source={IconResource.cameraCam} style={{ width: 20, height: 20 }} resizeMode='contain' />
                    <Image source={IconResource.iconImageCam} style={{ width: 20, height: 20 }} resizeMode='contain' />

                </View>
                <View style={{ height: 48, backgroundColor: '#3864FF', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>{'Đăng'}</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}
export default PostCreate;

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', padding: 10, backgroundColor: '#F5F5F5' },

});