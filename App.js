/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import MapView, {Marker} from 'react-native-maps';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Marina Bay sands open car park',
          distance: 2,
          time: 14,
          availableSpots: 7,
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Marina_Bays_Sands_Hotel_and_ArtScience_Museum_Singapore.jpg/338px-Marina_Bays_Sands_Hotel_and_ArtScience_Museum_Singapore.jpg',
        },
        {
          name: 'Marina financial center',
          distance: 2.3,
          time: 17,
          availableSpots: 170,
          picture:
            'https://www.eco-business.com/media/cache/61/33/6133b1d5dc6a95c040b7b8fcd3a584de.jpg',
        },
        {
          name: 'Marina Barrage car park',
          distance: 2.5,
          time: 14,
          availableSpots: 16,
          picture:
            'https://www.geomotion.com.au/uploads/8/2/5/2/82525882/marina-barrage-singapore_1_orig.jpg',
        },
        {
          name: 'OMB Car park',
          distance: 4,
          time: 20,
          availableSpots: 0,
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/a/ae/NTUC_Centre.JPG',
        },
      ],
      latitude: 0,
      longitude: 0,
      query: '',
      showResult: false,
      locationArray: [],
    };
  }
  sum(array, prop) {
    var total = 0;
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][prop];
    }
    return total;
  }
  componentDidMount() {
    this.checkgps();
    this.getCarpark();
  }
  async checkgps() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.setState(
    //     {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     },
    //     () => {
    //       navigator.geolocation.clearWatch(this.watchId);
    //     },
    //   );
    // });
    Geolocation.getCurrentPosition(
      position => {
        console.log('position:', position.coords.latitude);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  search(text) {
    const url =
      'https://developers.onemap.sg/commonapi/search?returnGeom=Y&getAddrDetails=Y&pageNum=1&searchVal=' +
      text;
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response:', responseJson);
        // this.setState({
        //   location: responseJson.results[0].ADDRESS,
        //   retrieved: true,
        //   lat: parseFloat(responseJson.results[0].LATITUDE),
        //   lon: parseFloat(responseJson.results[0].LONGTITUDE),
        // });
        this.setState({
          showResult: true,
          locationArray: responseJson.results,
        });
      })
      .catch(err => {
        console.log('error:', err);
        // return res.status(404).send(err);
      });
  }
  navigateToHere(item) {
    console.log('item:', item);
    this.setState({
      showResult: false,
      latitude: parseFloat(item.LATITUDE),
      longitude: parseFloat(item.LATITUDE),
    });

    _mapView.animateToRegion(
      {
        latitude: parseFloat(item.LATITUDE),
        longitude: parseFloat(item.LATITUDE),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000,
    );
  }

  getCarpark() {
    let url =
      'https://www.streetdirectory.com/api/?mode=search&profile=sd_auto&limit=50&country=sg&origin=*&output=json&q=carpark';
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('car park response:', responseJson);
        this.setState({locationArray: responseJson});
      });
  }
  render() {
    return (
      <View style={styles.map}>
        {this.state.latitude == 0 && (
          <View style={styles.center}>
            <ActivityIndicator size={'large'} style={{bottom: height / 6}} />
          </View>
        )}
        {this.state.latitude != 0 && (
          <MapView
            ref={mapView => {
              _mapView = mapView;
            }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={styles.map}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}>
              <Image
                style={styles.car}
                resizeMode={'contain'}
                source={require('./image/car.png')}
              />
            </MapView.Marker>
          </MapView>
        )}
        <View style={styles.header}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={require('./image/menu.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={{height: 40}}
              placeholder={' Where would you like to park?'}
              placeholderTextColor={'#4A8986'}
              onChangeText={text =>
                this.setState({query: text}, () => {
                  this.search(text);
                })
              }
              style={{fontWeight: 'bold', paddingLeft: 20}}
            />
            <TouchableOpacity
              style={styles.searchIconContainer}
              onPress={() => {
                this.search();
              }}>
              <Image
                source={require('./image/search.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {this.state.showResult == true && (
              <View style={styles.dropDown}>
                <FlatList
                  data={this.state.locationArray}
                  contentContainerStyle={{}}
                  renderItem={({item}) => (
                    <View style={styles.resultContainer}>
                      <Text
                        onPress={() => {
                          this.navigateToHere(item);
                        }}>
                        {item.ADDRESS}
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 0, maxHeight: height / 2}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.spotIndicatorContainer}>
              <View style={styles.center}>
                <Text style={styles.spotIndicatorText}>
                  {this.sum(this.state.data, 'availableSpots')} spots available
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.checkgps();
              }}
              style={styles.locationIconContainter}>
              <View style={styles.center}>
                <Image
                  source={require('./image/location.png')}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(241, 241, 241,0.7)',
              paddingTop: 15,
              borderRadius: 20,
            }}>
            <View
              style={{
                borderBottomColor: '#70E5C8',
                borderBottomWidth: 3,
                width: 50,
                alignSelf: 'center',
              }}
            />
            <FlatList
              data={this.state.data}
              contentContainerStyle={{paddingBottom: 50}}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{
                        uri: this.state.data[
                          Math.floor(Math.random() * this.state.data.length)
                        ].picture,
                      }}
                      style={styles.picture}
                      resizeMode="cover"
                    />

                    <View style={{justifyContent: 'center', paddingLeft: 50}}>
                      {this.state.locationArray.length > 0 && (
                        <Text style={styles.name} numberOfLines={2}>
                          {
                            this.state.locationArray[
                              Math.floor(
                                Math.random() * this.state.locationArray.length,
                              )
                            ].v
                          }
                        </Text>
                      )}
                      <Text style={styles.details}>
                        {item.distance + 'km  -' + item.time + ' mins away'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.spotsNumberContainer,
                      {
                        backgroundColor:
                          item.availableSpots == 0 ? 'lightgrey' : '#70E5C8',
                      },
                    ]}>
                    <View style={styles.center}>
                      <Text style={styles.spotsNumberText}>
                        {item.availableSpots}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  map: {
    height: height,
    width: width,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    justifyContent: 'center',
  },
  searchBar: {
    height: 45,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 20,
    marginLeft: 10,
    justifyContent: 'center',
  },
  searchIcon: {
    width: 25,
    height: 25,
  },
  car: {
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },
  itemContainer: {
    height: 80,
    width: width,
    backgroundColor: '#fff',
    marginBottom: 10,
    justifyContent: 'center',
  },
  picture: {
    height: 80,
    width: 120,
  },
  name: {
    color: '#4A8986',
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: width - 180,
  },
  details: {
    fontSize: 12,
    color: '#c1c1c1',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  spotIndicatorContainer: {
    backgroundColor: '#fff',
    width: 200,
    height: 35,
    borderRadius: 20,
    margin: 10,
    opacity: 0.85,
  },
  spotIndicatorText: {
    color: '#4A8986',
    fontWeight: 'bold',
    fontSize: 15,
  },
  locationIconContainter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },
  locationIcon: {
    width: 25,
    height: 25,
  },
  spotsNumberContainer: {
    height: 35,
    width: 70,
    borderRadius: 10,

    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    left: 85,
  },
  spotsNumberText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  dropDown: {
    position: 'absolute',
    maxHeight: 200,
    width: '90%',
    alignSelf: 'center',
    top: 45,
    backgroundColor: '#fff',
    borderWidth: 0.4,
    borderColor: 'lightgrey',
  },
  resultContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
