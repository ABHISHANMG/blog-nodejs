const { ApiError } = require('./errorHandler');

// Define roles and their permissions
const roles = {
    admin: {
        level: 4,
        permissions: ['*'] // All permissions
    },
    editor: {
        level: 3,
        permissions: [
            'create:post',
            'read:post',
            'update:post',
            'delete:post',
            'create:comment',
            'read:comment',
            'update:comment',
            'delete:comment'
        ]
    },
    member: {
        level: 2,
        permissions: [
            'create:post',
            'read:post',
            'update:own:post',
            'delete:own:post',
            'create:comment',
            'read:comment',
            'update:own:comment',
            'delete:own:comment'
        ]
    },
    viewer: {
        level: 1,
        permissions: [
            'read:post',
            'read:comment'
        ]
    }
};

// Middleware to check if user has required role
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user?.role || 'viewer';
        
        if (!roles[userRole]) {
            return next(new ApiError(403, 'Invalid role assigned to user'));
        }

        if (roles[userRole].level < roles[requiredRole].level) {
            return next(new ApiError(403, 'Insufficient permissions for this action'));
        }

        next();
    };
};

// Middleware to check specific permissions
const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const userRole = req.user?.role || 'viewer';
        
        if (!roles[userRole]) {
            return next(new ApiError(403, 'Invalid role assigned to user'));
        }

        const hasPermission = roles[userRole].permissions.includes('*') || 
                            roles[userRole].permissions.includes(requiredPermission);

        if (!hasPermission) {
            return next(new ApiError(403, 'Insufficient permissions for this action'));
        }

        next();
    };
};

// Middleware to check ownership
const checkOwnership = (resourceType) => {
    return (req, res, next) => {
        const userRole = req.user?.role || 'viewer';
        
        // Admin and editor can manage all resources
        if (roles[userRole].level >= roles.editor.level) {
            return next();
        }

        // For members, check if they own the resource
        if (userRole === 'member') {
            const resource = req[resourceType];
            if (!resource) {
                return next(new ApiError(404, `${resourceType} not found`));
            }

            if (resource.userId.toString() !== req.user.id.toString()) {
                return next(new ApiError(403, 'You can only manage your own resources'));
            }
        }

        next();
    };
};

module.exports = {
    roles,
    checkRole,
    checkPermission,
    checkOwnership
}; 