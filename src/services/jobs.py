def submit_job(service, payload, operation_id):
    response = service.create(payload, operation_id)
    if response.status == 503:
        existing = service.lookup(operation_id)
        if existing is not None:
            return existing
        response = service.create(payload, operation_id)
    return response.job_id
