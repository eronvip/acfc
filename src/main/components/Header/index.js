import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as categoryActions from '../../../core/actionCreators/categoryActions';
import { bindActionCreators, compose } from 'redux';
import { Text, View } from 'react-native';

import  * as s from './style';
import { API_ENDPOINT as URL } from '../../../core/constants';
import { popupConfirm } from '../../../core/actionCreators/ui';
import { Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listFile: [],
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
  renderCategory(parentId) {
    const { categories } = this.props;
    return (categories || []).filter(cat => cat.parentId === parentId).map((cat, key) => {
      return <Text onPress={() => this.selectCategory(cat.id)} style={s.styles.textCategory} key={key}>{cat.name}</Text>
    })
  }
  selectCategory(catId) {
    this.setState({
      catCurrent: catId
    })
  }
  render() {
    const { categories } = this.props;
    const { catCurrent } = this.state;
    // const { columnsGrid, dataSearch, dataSelected } = this.state;
    return (
      <>
        <View style={s.styles.headerTop}>
          <Image style={s.styles.headerLogo} source={{
            uri: 'https://exacdn.acfc.com.vn/static/version1622171088/frontend/Acfc/default/vi_VN/images/logo.svg'
          }} />
        </View>
        <View style={s.styles.contentCat1}>
          <Text><FontAwesomeIcon size={18} style={s.styles.iconCategory} icon={ faHome } /></Text>
          {this.renderCategory(null)}
        </View>
        <View style={s.styles.contentCat1}>
          {this.renderCategory(catCurrent)}
        </View>
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