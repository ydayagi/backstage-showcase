import { errorHandler } from '@backstage/backend-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { openApiDocument } from '../openapidocument';
import { fullFormats } from 'ajv-formats/dist/formats';
import { Context, OpenAPIBackend, Request } from 'openapi-backend';
import { Paths } from '../openapi';

export interface RouterOptions {
  logger: LoggerService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  // create openapi requests handler
  const api = new OpenAPIBackend({
    ajvOpts: {
      formats: fullFormats, // open issue: https://github.com/openapistack/openapi-backend/issues/280
    },
    validate: true,
    definition: openApiDocument,
  });

  await api.init();

  api.register(
    'validate',
    (
      c: Context<Paths.Validate.RequestBody>,
      _: express.Request,
      res: express.Response,
    ) => {
      let result = {
        valid: false,
        message: '',
      };

      switch (c.request.requestBody.type) {
        case 'username':
          result = validateUsername(
            c.request.requestBody.value,
            c.request.requestBody.formData,
          );
          break;
        case 'id':
          result = validateId(
            c.request.requestBody.value,
            c.request.requestBody.formData,
          );
          break;
        default:
          throw new Error('unknown validation type');
      }

      if (!result.valid) {
        logger.debug(`input not valid: ${result.message}`);
      }

      return res.json(result);
    },
  );

  const router = Router();
  router.use(express.json());
  router.use((req, res, next) => {
    if (!next) {
      throw new Error('next is undefined');
    }
    const validation = api.validateRequest(req as Request);
    if (!validation.valid) {
      res.status(500).json({ status: 500, err: validation.errors });
      return;
    }

    api.handleRequest(req as Request, req, res).catch(next);
  });

  router.use(errorHandler());

  return router;
}

function validateUsername(
  value: string,
  formData: object,
): { valid: boolean; message: string } {
  const validValues = ['admin', 'user'];

  if (formData && validValues.includes(value)) {
    return {
      valid: true,
      message: 'valid',
    };
  }
  return {
    valid: false,
    message: 'input is not in list of valid values',
  };
}

function validateId(
  value: string,
  formData: object,
): { valid: boolean; message: string } {
  const match = value.match(/^[a-z0-9-]+$/g);
  if (formData && match && match.length === 1) {
    return {
      valid: true,
      message: 'valid',
    };
  }
  return {
    valid: false,
    message: 'input not valid. has to match /^[a-z0-9-]+$/',
  };
}
