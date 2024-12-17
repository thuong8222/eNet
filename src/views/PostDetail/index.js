import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Animated, Modal, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';
import { GetObjectProperty, } from '../../utils/Helper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { MissingIcon } from '@react-navigation/elements';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');
const PostDetail = (props) => {
    const navigation = useNavigation();

    const [isSticky, setIsSticky] = useState(true);

    const [page, setPage] = useState(1);
    const [dataAllPage, setDataAllPage] = useState(1)
    const dataUser = props.route.params;
  
    const dataMenu = [
        { id: 1, text: 'Phát trực tiếp', imageitem: 'user-add' },
        { id: 2, text: 'Vị trí' },
        { id: 3, text: 'Gắn thẻ' },
        { id: 4, text: 'Cảm xúc' },
    ]
    const listImage = [
        { photoUrl: "https://static.miraheze.org/bluearchivewiki/thumb/c/c2/Hoshino_%28Swimsuit%29.png/266px-Hoshino_%28Swimsuit%29.png", id: 1 },
        { photoUrl: "https://static.miraheze.org/bluearchivewiki/thumb/5/53/Iori_%28Swimsuit%29.png/266px-Iori_%28Swimsuit%29.png", id: 2 },
        { photoUrl: "https://static.miraheze.org/bluearchivewiki/thumb/b/bf/Iroha.png/266px-Iroha.png", id: 3 },
    ]

    const ItemMeunuPress = () => { Alert.alert('chưc năng'); }

    const LikePress = () => {
        Alert.alert('yêu thích')
    }


    return (
        <SafeAreaView style={[styles.container,]}>

            <View style={{ flexDirection: 'row', gap: 10, height: 56, alignItems: 'center', width: '99%', backgroundColor: '#fff', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={navigation.goBack} >
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
            <View style={{ gap: 10, flex: 1, padding: 10, backgroundColor: '#fff' }}>
                <View style={{ height: width * (398 / 418), borderRadius: 20 }}>
                    <Swiper
                        loop={false}
                        autoplay={false}
                        paginationStyle={{ bottom: 0 }}
                        horizontal={true}
                        index={1}
                        dotStyle={{ backgroundColor: '#B3B3B3' }}
                        activeDotStyle={{ width: 22, backgroundColor: '#FDD3D0' }}
                    >

                        {
                            listImage.map((props, index) => {
                                return (
                                    <View key={index} activeOpacity={.7} style={{ height: width * (398 / 418), borderRadius: 20 }}>
                                        {/* <Image source={ImagesResource.backBanner} resizeMode='cover' style={{ borderRadius: 20, height: width * (398 / 418), width: width - 20 }} /> */}
                                        <Image source={{ uri: props.photoUrl }} resizeMode='cover' style={{ borderRadius: 20, height: width * (398 / 418), width: width - 20 }} />

                                    </View>
                                )
                            })
                        }
                    </Swiper>
                </View>
                {/* <View>
                    <Image source={{ uri: GetObjectProperty(dataUser.data, 'photoUrl') }} style={{ height: 418, width: width - 20, borderRadius: 20 }} resizeMode='cover'></Image>
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center', }}>
                        <Image source={IconResource.heart} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center' }}>
                        <Image source={IconResource.comment} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center', }}>
                        <Image source={IconResource.share} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center', }}>
                        <Image source={IconResource.statistics} style={styles.iconAct} />
                        <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={{ fontSize: 16 }}>{'Nội dung Dân ca Quan họ là một trong những làn điệu dân ca tiêu biểu của vùng châu thổ sông Hồng ở miền Bắc Việt Nam.'}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, marginTop: 10, padding: 16, backgroundColor: '#fff' }}>
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
    container: { height: '100%', width: '100%', backgroundColor: '#F5F5F5' },

});