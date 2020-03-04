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
import ModalDropdown from 'react-native-modal-dropdown';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  componentDidMount() {}
  showDropDown() {
    this._dropdown && this._dropdown.show();
  }
  search(text) {
    if (text.length > 0) {
      const url =
        'https://developers.onemap.sg/commonapi/search?returnGeom=Y&getAddrDetails=Y&pageNum=1&searchVal=' +
        text;
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              showResult: true,
              locationArray: responseJson.results,
            },
            () => {
              this.showDropDown();
            },
          );
        })
        .catch(err => {
          console.log('error:', err);
          // return res.status(404).send(err);
        });
    }
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
  _dropdown_renderRow(rowData, rowID, highlighted) {
    return (
      <View style={styles.resultContainer}>
        <Text
          onPress={() => {
            this.props.navigateToHere(rowData);
            this._dropdown && this._dropdown.hide();
          }}>
          {rowData.ADDRESS}
        </Text>
      </View>
    );
  }
  render() {
    return (
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
        <ModalDropdown
          accessible={false}
          ref={el => (this._dropdown = el)}
          options={this.state.locationArray}
          renderRow={this._dropdown_renderRow.bind(this)}
          style={styles.searchBar}>
          <View>
            <TextInput
              style={{height: 40}}
              placeholder={'Where would you like to park?'}
              placeholderTextColor={'#4A8986'}
              onChangeText={text => this.setState({query: text})}
              style={{fontWeight: 'bold', paddingLeft: 20}}
              onSubmitEditing={() => this.search(this.state.query)}
            />
            <TouchableOpacity
              style={styles.searchIconContainer}
              onPress={() => {
                this.search(this.state.query);
              }}>
              <Image
                source={require('./image/search.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ModalDropdown>
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
    top: 10,
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
    width: width * 0.75,
  },
});
