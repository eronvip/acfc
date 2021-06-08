import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as categoryActions from '../../../core/actionCreators/categoryActions';
import { bindActionCreators, compose } from 'redux';
import { FlatList, Text, View } from 'react-native';

import  * as s from './style';
import { API_ENDPOINT as URL } from '../../../core/constants';
import { popupConfirm } from '../../../core/actionCreators/ui';
import { Image } from 'react-native';
import logo from '../../../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listFile: [],
      imageLogo: 'https://exacdn.acfc.com.vn/static/version1622171088/frontend/Acfc/default/vi_VN/images/logo.svg',
      catCurrent: 1
    }
  }

  componentDidMount() {
    const { categoryActionCreator } = this.props;
    const { listAllCategories } = categoryActionCreator;
    listAllCategories({
      parentId: null
    });
  }
  onClickDelete = (calegory) => {
    // let self = this
    // popupConfirm({
    //   title: 'Delete',
    //   html: "Bạn muốn xóa Công cụ này?",
    //   ifOk: () => {
    //     const { toolActionCreator } = self.props;
    //     const { deleteTool } = toolActionCreator;
    //     deleteTool(tool)
    //   }
    // })
  }
  renderDataCategory(parentId) {
    const { categories } = this.props;
    if (categories)
      return categories.filter(cat => cat.parentId === parentId);
    else
      return [];
  }
  renderCategory(parentId) {
    const { categories } = this.props;
    const { catCurrent } = this.state;
    return (categories || []).filter(cat => cat.parentId === parentId).map((cat, key) => {
      return <Text onPress={() => this.selectCategory(cat.id)} style={[
        s.styles.textCategory,
        {
          borderBottomWidth: 2,
          borderBottomColor: cat.id === catCurrent ? "#811e2d" : "#fff"
        }
      ]} key={cat.id}>{cat.name}</Text>
    })
  }
  selectCategory(catId) {
    this.flatListMenu.scrollToOffset({ animated: true, offset: 0 });
    this.setState({
      catCurrent: catId
    })
  }
  render() {
    const { catCurrent, imageLogo } = this.state;
    // const { columnsGrid, dataSearch, dataSelected } = this.state;
    return (
      <>
        <View style={s.styles.headerTop}>
          <Image style={s.styles.headerLogo} source={logo} />
        </View>
        <View style={s.styles.contentCat1}>
          <Text style={{ marginRight: 10 }}><FontAwesomeIcon size={18} color={"#811e2d"} icon={ faHome } /></Text>
          {this.renderCategory(null)}
        </View>
        <FlatList
          ref={(ref) => { this.flatListMenu = ref; }}
          data={this.renderDataCategory(catCurrent)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          style={{ marginTop: 10 }}
          renderItem={({item}) => {
            return <Text style={s.styles.textCategory}>{item.name}</Text>
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.categories || []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    categoryActionCreator: bindActionCreators(categoryActions, dispatch)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect
)(HeaderComponent);