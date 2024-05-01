SELECT 
    DATE(c.`createdAt`) AS Date,
    SUM(c.`timeDifference`) AS totalTime,
    SUM(c.`q`) AS q,
    SUM(c.`q`) / SUM(c.`timeDifference`) AS v,
    SUM(c.`q`) * s.`value` AS price
FROM 
    consumptions c
JOIN 
    (SELECT * FROM settings WHERE `key` = 'price' LIMIT 1) AS s ON 1=1
WHERE 
    c.`createdAt` >= '2024-04-19' AND c.`createdAt` <= '2024-04-21'
GROUP BY 
    DATE(c.`createdAt`), s.`value`;
