<template>
  <div>
    <div class="content-section implementation">
      <div class="card">

        <Toast/>
        <p>{{ $store.state.sortFieldStockArne }}{{ $store.state.sortOrderStockArne }}</p>
        <Toolbar class="p-mb-4">
          <template #left>
            <Button label="Get new data" icon="pi pi-cloud-download" class="p-button-success p-mr-2"
                    @click="getNewData()" :disabled="!selectedProducts || !selectedProducts.length"/>
            <Button label="Refresh" icon="pi pi-refresh" @click="update"/>
          </template>

        </Toolbar>
        <DataTable :value="products" v-model:sortField="$store.state.sortFieldStockArne" v-model:sortOrder="$store.state.sortOrderStockArne"
                   v-model:selection="selectedProducts" removableSort showGridlines
                   :paginator="true" :rows="30" :rowsPerPageOptions="[10,20,25,30,50]" :reorderableColumns="true"
                   paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                   class="p-datatable-sm" responsiveLayout="scroll"
                   v-model:filters="filters" filterDisplay="menu"
                   :resizableColumns="true" columnResizeMode="fit">
          <template #header>
            <div class="p-d-flex p-jc-between">
              <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
                      @click="clearFilter()"/>
              <span class="p-input-icon-left">
                            <i class="pi pi-search"/>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
                      </span>
            </div>
          </template>

          <Column selectionMode="multiple" style="width: 3rem" :exportable="false">
          </Column>
          <Column field="stockMasterData.id" header="ID" :sortable="true">
            <template #body="{data}">
              {{ data.id }}
            </template>
            <template #filter="{filterModel,filterCallback}">
              <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                         class="p-column-filter" :placeholder="`Search by id - ${filterModel.matchMode}`"/>
            </template>
            <!--template #filter="{filterModel,filterCallback}">
              <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" :placeholder="`Search by name - ${filterModel.matchMode}`" v-tooltip.top.focus="'Hit enter key to filter'"/>
            </template-->
          </Column>
          <Column field="stockMasterData.id" header="ID" :sortable="true"/>
          <Column field="stockMasterData.isin" header="ISIN" :sortable="true">
            <template #filter="{filterModel,filterCallback}">
              <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                         class="p-column-filter" :placeholder="`Search by isin - ${filterModel.matchMode}`"/>
            </template>
          </Column>
          <Column field="stockMasterData.security" header="security" :sortable="true" :showFilterMatchModes="false">
            <template #filter="{filterModel,filterCallback}">
              <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="securities" placeholder="Any"
                        :showFilterMatchModes="false" class="p-column-filter" :showClear="true">
              </Dropdown>
            </template>
          </Column>
          <Column field="stockMasterData.company" header="company" :sortable="true">
            <template #filter="{filterModel,filterCallback}">
              <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                         class="p-column-filter" :placeholder="`Search by company - ${filterModel.matchMode}`"/>
            </template>
          </Column>
          <Column field="stockMasterData.industryDescription" header="industry" :sortable="true"
                  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
            <template #filter="{filterModel}">
              <div class="p-mb-3 p-text-bold">industry picker</div>
              <MultiSelect v-model="filterModel.value" :options="industries"
                           placeholder="Any" class="p-column-filter">
              </MultiSelect>
            </template>
          </Column>
          <Column field="stockMasterData.stockMasterDataGroupNameList" header="groups" :sortable="true" >
            <template #filter="{filterModel}">
              <MultiSelect v-model="filterModel.value" :options="groups"
                           placeholder="Any" class="p-column-filter">
              </MultiSelect>
            </template>
          </Column>

          <Column field="lastClose" header="previous close" :sortable="true">

          </Column>
          <Column field="modifiedDate" header="Date" :sortable="true" style="min-width: 8rem">
            <template #body="{data}">
              {{ formatDate(data.modifiedDate) }}
            </template>
            <!--template #filter="{filterModel}">
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
            </template-->
          </Column>
          <Column field="fiftyTwoWeeksLow" header="52W-" :sortable="true"></Column>
          <Column field="fiftyTwoWeeksHigh" header="52W+" :sortable="true"></Column>
          <Column field="oneWeekPerformance.percent" header="1 week" :sortable="true">
            <template #body="{data}">
              <div :class="stockClass(data.oneWeekPerformance.percent.toFixed(2))" v-if="data.oneWeekPerformance">
                {{ data.oneWeekPerformance.percent.toFixed(2) }}%
              </div>
            </template>
          </Column>
          <Column field="oneMonthPerformance.percent" header="1 month" :sortable="true">
            <template #body="{data}">
              <div :class="stockClass(data.oneMonthPerformance.percent.toFixed(2))" v-if="data.oneMonthPerformance">
                {{ data.oneMonthPerformance.percent.toFixed(2) }}%
              </div>
            </template>
          </Column>
          <Column field="threeMonthPerformance.percent" header="3 month" :sortable="true">
            <template #body="{data}">
              <div :class="stockClass(data.threeMonthPerformance.percent.toFixed(2))" v-if="data.threeMonthPerformance">
                {{ data.threeMonthPerformance.percent.toFixed(2) }}%
              </div>
            </template>
          </Column>
          <Column field="oneYearPerformance.percent" header="1 year" :sortable="true">
            <template #body="{data}">
              <div :class="stockClass(data.oneYearPerformance.percent.toFixed(2))" v-if="data.oneYearPerformance">
                {{ data.oneYearPerformance.percent.toFixed(2) }}%
              </div>
            </template>
          </Column>
          <Column field="threeYearPerformance.percent" header="3 year" :sortable="true">
            <template #body="{data}">
              <div :class="stockClass(data.threeYearPerformance.percent.toFixed(2))" v-if="data.threeYearPerformance">
                {{ data.threeYearPerformance.percent.toFixed(2) }}%
              </div>
            </template>
          </Column>
          <Column field="fiveYearPerformance.percent" header="5 year" :sortable="true">
            <template #body="{data}">
              <div :class="stockClass(data.fiveYearPerformance.percent.toFixed(2))" v-if="data.fiveYearPerformance">
                {{ data.fiveYearPerformance.percent.toFixed(2) }}%
              </div>
            </template>
          </Column>

        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import {FilterMatchMode,FilterOperator} from 'primevue/api'

export default {
  name: 'DataTableStockArne',
  data() {
    return {
      products: null,
      filters: null,
      selectedProducts: null,
      securities: null,
      industries: null,
      groups: null
    }
  },
  created() {
    this.initFilters();
  },
  mounted() {
    this.renderTable();
    axios.get("/api/new/industries")
      .then(response => {
        // JSON responses are automatically parsed.
        this.industries = response.data
        console.log(response.data);
      });

    axios.get("/api/new/securities")
      .then(response => {
        // JSON responses are automatically parsed.
        this.securities = response.data
        console.log(response.data);
      });
  },
  methods: {
    update() {
      this.$forceUpdate();
      this.renderTable();
    },
/*    getNewData() {
      //this.selectedProducts.forEach(val => console.log(val.stockMasterData.isin));
      this.selectedProducts.forEach(val => this.callAddYahooSingle(val.stockMasterData.isin));
      this.selectedProducts = null;
      //this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    },*/
    renderTable() {
      fetch("/api/new/stockarne")
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
          console.log(data);
        });
      axios.get("/api/new/stockmasterdatagroupnames")
        .then(response => {
          // JSON responses are automatically parsed.
          this.groups = response.data
          console.log(response.data);
        });

    },
    formatDate(value) {
      return new Date(value).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    formatCurrency(value) {
      return value.toLocaleString('de-DE', {style: 'currency', currency: 'USD'});
    },
    clearFilter() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'stockMasterData.id': {value: null, matchMode: FilterMatchMode.EQUALS},
        'stockMasterData.isin': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'stockMasterData.tickerForYAHOO': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'stockMasterData.security': {value: null, matchMode: FilterMatchMode.EQUALS},
        'stockMasterData.company': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'stockMasterData.industryDescription': {value: null, matchMode: FilterMatchMode.IN},
        'stockMasterData.stockMasterDataGroupNameList': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}]}
      }
    },
    stockClass(value) {
      return [
        {
          'negative': value < 0,
          'positive': value > 0
        }
      ];
    },
    callAddYahooSingle(isin) {
      axios.put("/api/async/addYahooSingle/" + isin)
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data
          console.log(this.response);
          this.$forceUpdate();
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.negative {
  color: #ff0031;
}

.positive {
  color: #66BB6A;
}

/* not working */
.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.5rem 0.7rem;
}

//@import '../assets/styles/app/app.scss';
</style>
