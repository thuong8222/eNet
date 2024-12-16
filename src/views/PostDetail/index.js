import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Animated, Modal, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';
import { GetObjectProperty, } from '../../utils/Helper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { MissingIcon } from '@react-navigation/elements';

const { width, height } = Dimensions.get('window');
const PostDetail = (props) => {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isSticky, setIsSticky] = useState(true);
    const [activeTab, setActiveTab] = useState('Post');
    const [dataPosts, setDataPosts] = useState([
        { email: "thuongtth@gmail.com", fullname: "Trương Thị Hoài Thương", id: 1, userName: "thuongtth" },
        { email: "thuongtth@gmail.com", fullname: "Trương Thị Hoài Thương", id: 1, userName: "thuongtth" }
    ]);
    const [page, setPage] = useState(1);
    const [dataAllPage, setDataAllPage] = useState(1)
    const dataUser = props.route.params;
    console.log('dataUser', dataUser)
    const dataMenu = [
        { id: 1, text: 'Phát trực tiếp', imageitem: 'user-add' },
        { id: 2, text: 'Vị trí' },
        { id: 3, text: 'Gắn thẻ' },
        { id: 4, text: 'Cảm xúc' },
    ]


    const ItemMeunuPress = () => { Alert.alert('chưc năng'); }
    const menuRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={ItemMeunuPress} style={{ flexDirection: 'row', backgroundColor: '#F9FAFB', borderRadius: 20, height: 36, justifyContent: 'center', alignItems: 'center', borderColor: '#00000008', borderWidth: 1.5, gap: 3, paddingHorizontal: 10 }}>
                <Image source={IconResource.cameravideo} style={{ height: 13, width: 17 }} />
                <Text style={{ color: '#000', fontSize: 14 }}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
    const DetailPostPress = () => {
        navigation.navigate('DetailPostScreen');
    }
    const renderItem_dataPosts = ({ item }) => {
        return (
            <ItemPost data={item} gotoDetailPost={DetailPostPress} />
        )
    }
    const LoadMore = () => {
        console.log(page)
        if (dataAllPage > page) {
            setPage(page + 1)
        }
    }
    const scrollY = new Animated.Value(0); // Value to track scroll position




    // Interpolation to translate the view up when user scrolls down
    const translateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -48], // Move the tab 48px up when scroll reaches 100px
        extrapolate: 'clamp', // Stop moving after 100px
    });


    // Handle scroll event to check if the menu should be sticky
    const onScrollToGhimMenuFunction = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                if (event.nativeEvent.contentOffset.y > 200) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            },
        }
    );
    const LikePress = () => {
        Alert.alert('yêu thích')
    }


    return (
        <SafeAreaView style={[styles.container,]}>

            <View style={{ padding: 10, gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center',width:'99%' }}>
                    <TouchableOpacity >
                        <Image source={IconResource.chevronLeft} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 10, width: '90%' }}>
                        <Image source={{ uri: GetObjectProperty(dataUser.data, 'imageSchool') }} style={{ height: 40, width: 40, borderRadius: 20 }} resizeMode='contain' />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text style={{ color: '#000', fontSize: 18 }}>{dataUser.data.name}</Text>
                                <Image source={IconResource.verified} style={{ height: 16, width: 16 }} resizeMode='contain'></Image>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{'@' + dataUser.data.school}</Text>
                                <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{'2 giờ'}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={IconResource.noImoreHorizmage} style={{ height: 18, width: 18, }} resizeMode='contain'></Image>
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={{ uri: GetObjectProperty(dataUser.data, 'photoUrl') }} style={{ height: 418, width: width - 40, borderRadius: 20 }} resizeMode='contain'></Image>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image source={IconResource.heart} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image source={IconResource.comment} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image source={IconResource.share} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image source={IconResource.statistics} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 16 }}>{'Nội dung Dân ca Quan họ là một trong những làn điệu dân ca tiêu biểu của vùng châu thổ sông Hồng ở miền Bắc Việt Nam.'}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row' , alignItems:'center', gap:5, top:0}}>
                <Image source={ImagesResource.backBanner} style={{ height: 32, width: 32, borderRadius: 20 }} />
                <TextInput placeholder='Nhập bình luận ' style={{ flex: 1, padding: 15, backgroundColor: '#F9FAFB', borderRadius: 20 }}></TextInput>
                <Image source={IconResource.smile} style={{ height: 32, width: 32, borderRadius: 20 }} />
                <Image source={IconResource.IconoImage} style={{ height: 32, width: 32, borderRadius: 20 }} />

            </View>
        </SafeAreaView>

    )
}
export default PostDetail;

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', padding: 10, backgroundColor:'#F5F5F5'},

});