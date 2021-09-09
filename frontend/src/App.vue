<template>
  <v-app>
    <v-app-bar app color="#d1e8e7" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <vue-progress-bar></vue-progress-bar>
    <v-main>
      <v-container>
        <v-card class="mt-5">
          <v-card-title>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6"> </v-col>
              <v-col cols="12" xs="12" sm="12" md="3" lg="3"> </v-col>
              <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <!--search field -->
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  outlined
                  hide-details
                  dense
                ></v-text-field>
                  <!--search field -->
              </v-col>
            </v-row>
          </v-card-title>
            <!--start table -->
          <v-data-table
            :headers="headers"
            :search="search"
            :items="allClients"
            :items-per-page="8"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="#d1e8e7">
                <v-toolbar-title class="su-add-client-form-title"
                  >Clients</v-toolbar-title
                >
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  dark
                  class="mb-2"
                  @click="showAddClientForm"
                >
                  <span class="su-btn-add-new-client">New Client</span>
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.providers`]="{ item }">
              <span v-for="(singleItem, i) in item.providers" :key="i">
                {{ getProviderName(singleItem) }}
              </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <span @click="editClient(item)" class="mr-3 su-btn-edit"
                >Edit</span
              >
              <span class="su-btn-delete" @click="confirmDeleteClient(item)"
                >Delete</span
              >
            </template>
          </v-data-table>
            <!--end table -->
        </v-card>
      </v-container>
      <!-- add client dialog-->
      <v-dialog width="800" v-model="showAddClientDialog">
        <v-card>
          <v-toolbar-title></v-toolbar-title>
          <v-card-title class="su-add-client-form-header">
            <p style="color: blue">
              {{ editMode ? "Edit Client" : "New Client" }}
            </p>
          </v-card-title>
          <v-divider vertical class="mx-4"></v-divider>
          <v-card-text>
            <v-form
              lazy-validation
              ref="new_client_form"
              v-model="clientFormValid"
              @submit.prevent="editMode ? updateClient() : addNewClient()"
              class="pl-md-15"
            >
              <v-row no-gutters>
                <v-col md="2" sm="6" lg="2">
                  <p class="su-text-bold">Name:</p>
                </v-col>
                <v-col md="8" sm="6" lg="8">
                  <v-text-field v-model="clientForm.name" dense outlined>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col md="2" sm="6" lg="2">
                  <p class="float-left su-text-bold">Email:</p>
                </v-col>
                <v-col md="8" sm="6" lg="8">
                  <v-text-field
                    v-model="clientForm.email"
                    dense
                    outlined
                    type="text"
                    :rules="[required('Email'), validEmail(clientForm.email)]"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col md="2" sm="6" lg="2">
                  <p class="float-left su-text-bold">Phone:</p>
                </v-col>
                <v-col md="8" sm="6" lg="8">
                  <v-text-field
                    v-model="clientForm.phone"
                    dense
                    outlined
                    type="text"
                    :rules="[phoneNumberFormat(clientForm.phone)]"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col md="2" sm="6" lg="2">
                  <p class="float-left su-text-bold">Providers:</p>
                </v-col>
                <v-col md="8" sm="6" lg="8">
                  <v-row>
                    <v-col md="8" sm="12" lg="8">
                      <v-text-field
                        dense
                        outlined
                        v-model="providerForm.name"
                        ref="provider_field"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col md="4" sm="12" lg="4">
                      <v-btn
                        @click="
                          editModeProvider ? updateProvider() : addNewProvider()
                        "
                        ><span class="su-btn-add-new-provider">{{
                          editModeProvider ? "Update Provider" : "Add Provider"
                        }}</span></v-btn
                      >
                    </v-col>
                  </v-row>
                  <!-- start provider container -->
                  <v-row class="mb-4">
                    <v-col md="8" class="pr-0">
                      <v-card class="align-content-center" tile>
                        <v-card-text>
                          <v-row
                            v-for="(singleProvider, i) in allProviders"
                            :key="i"
                            align="center"
                            no-gutters
                          >
                            <v-col class="pl-5 pr-5">
                              <v-checkbox
                                v-model="clientForm.providers"
                                :label="singleProvider.name"
                                :value="singleProvider.id"
                              ></v-checkbox>
                            </v-col>
                            <v-row>
                              <v-icon
                                style="cursor: pointer"
                                @click="editProvider(singleProvider)"
                                >mdi-square-edit-outline</v-icon
                              >
                              <v-icon
                                style="cursor: pointer"
                                @click="deleteProvider(singleProvider)"
                                >mdi-delete</v-icon
                              >
                            </v-row>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!-- end provider container -->
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  style="text-transform: none"
                  color="red"
                  v-show="editMode"
                  id="btnDeleteClient"
                  @click="deleteClient"
                  ><span style="color: #fff">Delete Client</span></v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  class="text-capitalize pr-4 pl-5"
                  id="btnCancel"
                  @click="closeClientDialog"
                  >Cancel</v-btn
                >
                <v-btn
                  class="text-capitalize pr-4 pl-5"
                  id="btnAddClient"
                  type="submit"
                  >{{ editMode ? "Save Client" : "Add Client" }}</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- add client dialog-->
      <!-- snackbar start -->
      <v-snackbar v-model="snackbar" :color="snackbarColor" top right>
        <span style="color: blue">{{ this.notification }}</span>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>

      <!-- Snack bar end-->

      <!-- start delete confirmation -->
      <v-dialog v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title class="headline su-delete-dialog-header">
            Delete Client
          </v-card-title>

          <v-card-text class="pt-10 text-center">
            Are you sure you want to delete {{ selectedClientData.name }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text @click="deleteClient"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete confirmation -->
    </v-main>
  </v-app>
</template>

<script>
import validation from "./services/validation";
import Api from "./services/api";
export default {
  name: "App",

  components: {},
  data() {
    return {
      ...validation,
      // client form to backend
      // eslint-disable-next-line no-undef
      clientForm: new Form({
        name: "",
        email: "",
        phone: "",
        providers: [],
      }),
      // eslint-disable-next-line no-undef
      providerForm: new Form({
        name: "",
      }),
      search: "",
      clientFormValid: false,
      selectedProviders: [],
      showAddClientDialog: false,
      editMode: false,
      selectedClientData: {},
      deleteDialog: false,
      selectedProvider: "",
      editModeProvider: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Providers", value: "providers", sortable: false },
        { text: "Action", value: "actions", sortable: false },
      ],
      snackbar: false,
      notification: "test",
      snackbarColor: "#d1e8e7",
    };
  },
  computed: {
    allClients: {
      get() {
        return this.$store.state.allClients;
      },
    },
    allProviders: {
      get() {
        return this.$store.state.allProviders;
      },
    },
  },
  created() {
    this.fetchAllClient();
    this.fetchAllProviders();
  },
  methods: {
    getProviderName(id) {
      let name = "";
      //map through provider array and get corresponding name
      this.allProviders.map((e) => {
        if (e.id === id) {
          name = e.name;
        }
      });
      return name;
    },
    confirmDeleteClient(item) {
      this.selectedClientData = item;
      this.deleteDialog = true;
    },
    showAddClientForm() {
      this.editMode = false;

      this.showAddClientDialog = true;
    },
    closeClientDialog() {
      this.showAddClientDialog = false;
      this.editMode = false;
      this.editModeProvider = false;
      this.$refs.new_client_form.reset();
    },
    editClient(item) {
      this.selectedClientData = item;
      this.editMode = true;
      this.showAddClientDialog = true;
      this.clientForm.fill(item);
    },
    fetchAllClient() {
      this.$store.dispatch("getAllClients");
    },
    fetchAllProviders() {
      this.$store.dispatch("getAllProviders");
    },
    addNewClient() {
      // return if form isnt validated
      if (!this.$refs.new_client_form.validate()) return;
      this.$Progress.start();
      Api()
        .post("client/create", this.clientForm)
        .then((response) => {
          if (response.status === 200) {
            this.fetchAllClient();
            this.snackbar = true;
            this.snackbarColor = "#d1e8e7";
            this.showAddClientDialog = false;
            this.notification = "Client added successfully";
            this.$Progress.finish();
            this.$refs.new_client_form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "red";
          this.notification = "Something went wrong! Please try again ";
          this.$Progress.fail();
          this.$refs.new_client_form.reset();
        });
    },
    updateClient() {
      // return if form isnt validated
      if (!this.$refs.new_client_form.validate()) return;
      this.$Progress.start();
      Api()
        .put(
          "client/update/" + this.selectedClientData.id,
          this.clientForm
        )
        .then((response) => {
          if (response.status === 200) {
            this.fetchAllClient();
            this.snackbar = true;
            this.showAddClientDialog = false;
            this.snackbarColor = "#d1e8e7";
            this.$refs.new_client_form.reset();
            this.notification = "Client updated successfully";
            this.$Progress.finish();
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "red";
          this.notification = "Something went wrong! Please try again ";
          this.$Progress.fail();
        });
    },
    deleteClient() {
      // return if form isnt validated
      this.$Progress.start();
      Api()
        .delete("client/delete/" + this.selectedClientData.id)
        .then((response) => {
          if (response.status === 200) {
            this.fetchAllClient();
            this.snackbar = true;
            this.deleteDialog = false;
            this.showAddClientDialog = false;
            this.snackbarColor = "#d1e8e7";
            this.notification = "Client deleted successfully";
            this.$Progress.finish();
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "red";
          this.notification = "Something went wrong! Please try again ";
          this.$Progress.fail();
        });
    },
    addNewProvider() {
      this.$Progress.start();
      Api()
        .post("provider/create", this.providerForm)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.fetchAllProviders();
            this.snackbar = true;
            this.snackbarColor = "#d1e8e7";
            this.notification = "Provider added successfully";
            this.$Progress.finish();
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "red";
          this.notification = error.message;
          this.$Progress.fail();
        });
    },
    updateProvider() {
      this.$Progress.start();
      Api()
        .put(
          "provider/update/" + this.selectedProvider.id,
          this.providerForm
        )
        .then((response) => {
          if (response.status === 200) {
            this.fetchAllProviders();
            this.snackbar = true;
            this.snackbarColor = "#d1e8e7";
            this.notification = "provider updated successfully";
            this.$Progress.finish();
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "red";
          this.notification = "Something went wrong! Please try again ";
          this.$Progress.fail();
        });
    },
    deleteProvider(singleProvider) {
      this.$Progress.start();
      Api()
        .delete("provider/delete/" + singleProvider.id)
        .then((response) => {
          if (response.status === 200) {
            this.fetchAllProviders();
            this.snackbar = true;
            this.providerForm.reset();
            this.snackbarColor = "#d1e8e7";
            this.notification = "Provider deleted successfully";
            this.$Progress.finish();
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackbarColor = "red";
          this.notification = "Something went wrong! Please try again ";
          this.$Progress.fail();
        });
    },
    editProvider(singleProvider) {
      this.selectedProvider = singleProvider;
      this.editModeProvider = true;
      this.providerForm.fill(singleProvider);
    },
  },
};
</script>
<style>
.su-btn-delete {
  color: red;
  cursor: pointer;
}
.su-btn-edit {
  color: blue;
  cursor: pointer;
}
.su-add-client-form-header {
  background-color: #d1e8e7;
}
.su-delete-dialog-header {
  background-color: #d1e8e7;
}
.su-add-client-form-title {
  color: blue;
  text-transform: none;
}
.su-btn-add-new-client {
  text-transform: none;
  color: black;
}
.su-btn-add-new-provider {
  text-transform: none;
}
.su-provider-row {
  height: 400px;
  overflow-y: scroll;
}
.su-text-bold {
  font-weight: bolder;
  color: black;
}
</style>
