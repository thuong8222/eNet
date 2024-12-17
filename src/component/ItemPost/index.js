import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Animated, RefreshControl, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';
import { GetObjectProperty, } from '../../utils/Helper';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
const ItemPost = (props) => {
    const listImage = [
        { photoUrl: "https://static.miraheze.org/bluearchivewiki/thumb/c/c2/Hoshino_%28Swimsuit%29.png/266px-Hoshino_%28Swimsuit%29.png", id: 1 },
        { photoUrl: "https://static.miraheze.org/bluearchivewiki/thumb/5/53/Iori_%28Swimsuit%29.png/266px-Iori_%28Swimsuit%29.png", id: 2 },
        { photoUrl: "https://static.miraheze.org/bluearchivewiki/thumb/b/bf/Iroha.png/266px-Iroha.png", id: 3 },
    ]
    const GotoDetailPost = () => {
           props.gotoDetailPost(props.data);
       }
       const LikePress = () => {
           props.gotoLikePost(props.data);
   
       }
       let imageUserPost = ImagesResource.backBanner;
       if (GetObjectProperty(props.data, 'imageSchool') !== '') {
           imageUserPost = { uri: GetObjectProperty(props.data, 'imageSchool') }
       }
       let imagePost = ImagesResource.backBanner;
       if (GetObjectProperty(props.data, 'imageSchool') !== '') {
           imagePost = { uri: GetObjectProperty(props.data, 'photoUrl') }
       }
   
       return (
           <TouchableOpacity onPress={GotoDetailPost} style={{ padding: 10, gap: 10 }}>
               <View style={{ flexDirection: 'row', gap: 10 }}>
                   <Image source={imagePost} style={{ height: 40, width: 40, borderRadius: 20 }} resizeMode='contain' />
                   <View style={{ flex: 1 }}>
                       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                           <Text style={{ color: '#000', fontSize: 18 }}>{props.data.name}</Text>
                           <Image source={IconResource.verified} style={{ height: 16, width: 16 }} resizeMode='contain'></Image>
                       </View>
                       <View style={{ flexDirection: 'row', gap: 5 }}>
                           <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{'@' + props.data.school}</Text>
                           <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{'2 giờ'}</Text>
                       </View>
                   </View>
                   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                       <Image source={IconResource.noImoreHorizmage} style={{ height: 18, width: 18, }} resizeMode='contain'></Image>
                   </View>
   
               </View>
               <View style={{ height: width * (398 / 418),borderRadius:20 }}>
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
                                       <Image source={ImagesResource.backBanner} resizeMode='contain' />
                                   </View>
                               )
                           })
                       }
                   </Swiper>
               </View>
               {/* <View style={{}}>
                   <Image source={imagePost} style={{ height: width * (398 / 418), borderRadius: 20 }} resizeMode='cover'></Image>
               </View> */}
               <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%', }}>
                   <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center' }}>
                       <Image source={IconResource.heart} style={styles.iconAct} />
                       <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center' }}>
                       <Image source={IconResource.comment} style={styles.iconAct} />
                       <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center' }}>
                       <Image source={IconResource.share} style={styles.iconAct} />
                       <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, alignItems: 'center' }}>
                       <Image source={IconResource.statistics} style={styles.iconAct} />
                       <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                   </TouchableOpacity>
               </View>
               <View>
                   <Text style={{ fontSize: 16 }}>{'Nội dung Dân ca Quan họ là một trong những làn điệu dân ca tiêu biểu của vùng châu thổ sông Hồng ở miền Bắc Việt Nam.'}</Text>
               </View>
           </TouchableOpacity>
       )}

export default ItemPost;
const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', backgroundColor: '#f5f5f5' },
  
    iconAct: { height: 14, width: 16 },
    tab: { height: 48, justifyContent: 'center', paddingRight: 10, justifyContent: 'center' },
    tabActive: { borderBottomColor: '#3864FF', paddingRight: 10, borderBottomWidth: 3, height: 48, justifyContent: 'center' },


});