def submit_job(service, payload, operation_id):
    response = service.create(payload, operation_id)
    if response.status == 503:
        response = service.create(payload, operation_id)
    return response.job_id
