import { apiSlice } from "../../app/api/apiSlice";

const { createEntityAdapter, createSelector } = require("@reduxjs/toolkit");

const projectsAdapter = createEntityAdapter({});

const initialState = projectsAdapter.getInitialState();

export const projectsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/project/index",
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Project", id: "LIST" }];
      },
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/project/edit`,
        method: "GET",
        params: {
          id,
        },
      }),
      transformResponse: (responseData) => {
        return responseData.data;
      },
      providesTags: (result, error, arg) => [{ type: "Project", id: arg }],
    }),

    addNewProject: builder.mutation({
      query: (initialProjectData) => ({
        url: "/project/create",
        method: "POST",
        body: {
          ...initialProjectData,
        },
      }),
      invalidatesTags: [
        {
          type: "Project",
          id: "LIST",
        },
      ],
    }),

    updateProject: builder.mutation({
      query: (initialProjectData) => ({
        url: "/project/update",
        method: "POST",
        body: {
          ...initialProjectData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "Project",
          id: arg.id,
        },
        {
          type: "Project",
          id: "LIST",
        },
      ],
    }),

    deleteProject: builder.query({
      query: (id) => ({
        url: "project/delete",
        method: "GET",
        params: {
          id,
        },
      }),
    }),

    getContractList: builder.query({
      query: (project_id) => ({
        url: "/contract/index",
        method: "GET",
        params: {
          project_id,
        },
      }),
    }),

    deleteContract: builder.query({
      query: (id) => ({
        url: "contract/delete",
        method: "GET",
        params: {
          id,
        },
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useLazyGetProjectByIdQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectQuery,
  useDeleteContractQuery,
  useGetContractListQuery,
} = projectsSlice;

// Returns the query result object
export const selectProjectsResult =
  projectsSlice.endpoints.getProjects.select();

// Creates memozied selector
const selectProjectsData = createSelector(
  selectProjectsResult,
  (ProjectsResult) => ProjectsResult.data // normalized state object with ids and entities
);

export default projectsSlice.reducer;

// getSelectors creates these selector and we rename them with aliases using destructuring
export const {
  selectAll: selectAllprojects,
  selectById: selectUserById,
  selectIds: selectUserIds,

  //   Pass in a selector that returns the projects slice of state
} = projectsAdapter.getSelectors(
  (state) => selectProjectsData(state) ?? initialState
);
