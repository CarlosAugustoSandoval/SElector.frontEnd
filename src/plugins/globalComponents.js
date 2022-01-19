import Vue from 'vue'
// Inputs components
import CText from '@/components/globalComponents/CText'
import CPassword from '@/components/globalComponents/CPassword'
import CSelectComplete from '@/components/globalComponents/CSelectComplete'
import CDateManual from '@/components/globalComponents/CDateManual'
import CRadio from '@/components/globalComponents/CRadio'
import CNumber from '@/components/globalComponents/CNumber'
import CTextArea from '@/components/globalComponents/CTextArea'
import CTooltip from '@/components/globalComponents/CTooltip'
import CCard from '@/components/globalComponents/CCard'
import CConfirm from '@/components/globalComponents/CConfirm'
import Loading from '@/components/globalComponents/loading/components/Loading'
import ViewTitle from '@/components/globalComponents/ViewTitle'
import CRows from '@/components/globalComponents/cDataRows/components/CRows'
import CChip from '@/components/globalComponents/CChip'
import CDateRange from '@/components/globalComponents/CDateRange'
import CComboBox from '@/components/globalComponents/CComboBox'
import OptionsButtons from '@/components/globalComponents/OptionsButtons'

Vue.use({
  install (Vue) {
    Vue.component('CText', CText)
    Vue.component('CPassword', CPassword)
    Vue.component('CSelectComplete', CSelectComplete)
    Vue.component('CDateManual', CDateManual)
    Vue.component('CRadio', CRadio)
    Vue.component('CNumber', CNumber)
    Vue.component('CTextArea', CTextArea)
    Vue.component('CTooltip', CTooltip)
    Vue.component('CCard', CCard)
    Vue.component('CConfirm', CConfirm)
    Vue.component('Loading', Loading)
    Vue.component('ViewTitle', ViewTitle)
    Vue.component('CRows', CRows)
    Vue.component('CChip', CChip)
    Vue.component('CDateRange', CDateRange)
    Vue.component('CComboBox', CComboBox)
    Vue.component('OptionsButtons', OptionsButtons)

  }
})
