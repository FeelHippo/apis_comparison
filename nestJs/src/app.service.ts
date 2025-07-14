import { Injectable } from '@nestjs/common';
import { gql, request } from 'graphql-request';
import { validateCountriesResponse } from './validation/validate.countries.js';
import { Countries } from './interfaces/interface.countries.js';

@Injectable()
export class AppService {
  async getAllCountries(): Promise<Countries> {
    try {
      const url = 'https://api.geographql.rudio.dev/graphql';
      const document = gql`
        query getAllCountries(
          $filter: CountryFilterInput!
          $page: PaginationInput!
        ) {
          countries(filter: $filter, page: $page) {
            totalCount
            edges {
              cursor
              node {
                name
                phone_code
                capital
                currency
                native
                emoji
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
            }
          }
        }
      `;
      const variables = {
        filter: { region: 'Europe' },
        page: { first: 10 },
      };
      const response = await request({
        url,
        document,
        variables,
      });
      const validation = validateCountriesResponse(response as object);
      return validation.value;
    } catch (error) {
      console.error(error);
    }
  }
}
