<template>
  <div>
    <b-container fluid>
      <b-row class="mt-5">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="1"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Start typing to search"
              >
              </b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="1"
            label-cols-md="4"
            label-cols-lg="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            >
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          >
          </b-pagination>
        </b-col>
      </b-row>

      <b-table
        :items="usersList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        class="bg-light mt-3"
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, $event.target)"
            class="mr-1"
            variant="success"
          >
            Edit user modal
          </b-button>
          <b-button
            size="sm"
            @click="row.toggleDetails"
            class="mr-1"
            variant="success"
          >
            {{ row.detailsShowing ? "Hide" : "Show" }} details
          </b-button>
          <b-button size="sm" @click="deleteUser(row.item)" variant="success">
            Delete user
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="editUserModal"
        size="lg"
      >
        <b-form-textarea v-model="infoModal.content" rows="20">
        </b-form-textarea>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
/*
  	Add the main users table with search functionality, sorting, plain textarea editing
	in a modal, viewing a user's full information and deleting a user.
	An Easter egg and a nod to Blizzard's Diablo and StarCraft displays 666 users in the table.
*/
import Axios from "axios";
const usersURL = "http://localhost:3500/users";

export default {
  name: "users-table-component",

  data() {
    return {
      usersList: [],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "first_name",
          label: "First name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "last_name",
          label: "Last name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "active",
          label: "Active",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "date_of_birth",
          label: "DoB",
        },
        {
          key: "city",
          label: "City",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "country",
          label: "Country",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "created_at",
          label: "Date of creation",
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 666, text: "There is no cow level" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  created() {
    Axios.get(usersURL).then((response) => {
      this.usersList = response.data;
      this.totalRows = response.data.length;
    });
  },
  methods: {
    info(item, button) {
      this.infoModal.title = `Current user ID: ${item.id}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.infoModal.index = item.id;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    editUserModal() {
      Axios.put(
        `${usersURL}/${this.infoModal.index}`,
        JSON.parse(this.infoModal.content)
      );
      this.infoModal.title = "";
      this.infoModal.content = "";
      this.refreshUsersList();
    },
    deleteUser(user) {
      Axios.delete(`${usersURL}/${user.id}`);
      this.refreshUsersList();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    refreshUsersList() {
      Axios.get(usersURL).then((response) => {
        this.usersList = response.data;
      });
    },
  },
};
</script>

<style>
.page-item.active .page-link,
.modal-footer .btn {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}

.page-link {
  color: inherit !important;
}

table {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
</style>